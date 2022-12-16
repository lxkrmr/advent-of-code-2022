import { loadFile } from '../lib/utils';

async function main() {
  const raw = await loadFile('input.txt');
  const lines = raw.split('\n');

  const lastWorkinfDirectory = lines.reduce(
    (curDir, line) => evaluate(line, curDir),
    new Dir('/')
  );

  const root = getRoot(lastWorkinfDirectory);
  const dirInfos = walkTree(root);

  // part one - find the total of all dir infos
  // where each dirInfo is not bigger then 100_000
  console.log('### part one ###');
  const atMost = dirInfos.filter((info) => info.size < 100_000);
  console.log(atMost);
  const result = atMost.reduce((acc, cur) => acc + cur.size, 0);
  console.log('final result:', result);

  // part two - find dir to make update possible
  console.log('### part two ###');
  console.log(dirInfos);
  const totalDiskSpace = 70_000_000;
  const neededForUpdate = 30_000_000;
  const currentDiskUsage = toDirInfo(root).size;
  const freeDiskSpace = totalDiskSpace - currentDiskUsage;
  const additionalNeededForUpdate = neededForUpdate - freeDiskSpace;
  const candidates = dirInfos.filter(
    (info) => info.size >= additionalNeededForUpdate
  );
  const minCandidate = candidates.reduce(
    (acc, cur) => (acc < cur.size ? acc : cur.size),
    Infinity
  );
  console.log(`total: ${totalDiskSpace}`);
  console.log(`in use: ${currentDiskUsage}`);
  console.log(`free: ${freeDiskSpace}`);
  console.log(`needed for update (total): ${neededForUpdate}`);
  console.log(`needed for update (in addition): ${additionalNeededForUpdate}`);
  console.log('potential candidates: ', candidates);
  console.log('pick min candidate: ', minCandidate);
}

function walkTree(tree: Dir): DirInfo[] {
  const dir = toDirInfo(tree);
  const subDirs = tree.directories.flatMap((sub) => walkTree(sub));

  return [dir, ...subDirs];
}

function toDirInfo(dir: Dir): DirInfo {
  return {
    name: dir.name,
    size: totalFileSize(dir),
  };
}

function totalFileSize(dir: Dir): number {
  const curSize = dir.files.reduce((acc, cur) => acc + cur.size, 0);
  return (
    curSize +
    dir.directories
      .map((sub) => totalFileSize(sub))
      .reduce((acc, cur) => acc + cur, 0)
  );
}

main();

function evaluate(line: string, curDir: Dir): Dir {
  if (isChangeDirectoryCommand(line)) {
    return changeDirectory(line, curDir);
  }

  if (isDirListing(line)) {
    return handleDirListing(line, curDir);
  }

  if (isFileListing(line)) {
    return handleFileListing(line, curDir);
  }

  console.info('line did not match: ', line);
  return curDir;
}

function isChangeDirectoryCommand(line: string) {
  return /^\$ cd/.test(line);
}

function isDirListing(line: string) {
  return /dir */.test(line);
}

function isFileListing(line: string) {
  return /\d{1,} [\w.].*/.test(line);
}

function changeDirectory(command: string, curDir: Dir): Dir {
  const { destination } =
    command.match(/^\$ cd (?<destination>.*)/)?.groups || {};
  switch (destination) {
    case '/':
      return getRoot(curDir);
    case '..':
      return getParent(curDir);
    case undefined:
    case null:
      return handleError(command, curDir);
    default:
      return getOrCreateDir(destination, curDir);
  }
}

function handleDirListing(listing: string, curDir: Dir): Dir {
  const { dirName } = listing.match(/dir (?<dirName>.*)/)?.groups || {};
  getOrCreateDir(dirName, curDir);
  return curDir;
}

function handleFileListing(listing: string, curDir: Dir): Dir {
  const { size, name } =
    listing.match(/(?<size>\w{1,}) (?<name>[\w.].*)/)?.groups || {};
  curDir.files.push(new Filz(name, parseInt(size)));

  return curDir;
}

function getRoot(curDir: Dir): Dir {
  const root = curDir.parent ? getRoot(curDir.parent) : curDir;
  //console.log(`Get root - curDir: ${curDir.name} root: ${root.name}`);
  return root;
}

function getParent(curDir: Dir): Dir {
  const parent = curDir.parent;
  if (parent) {
    //console.info(`Get parent - curDir: ${curDir.name} parent: ${parent.name}`);
    return parent;
  }

  console.error('### Error getting parent dir from current dir:', curDir.name);
  return curDir;
}

function handleError(command: String, curDir: Dir): Dir {
  console.error('### Error invalid command:', command);
  return curDir;
}

function getOrCreateDir(dirName: string, curDir: Dir): Dir {
  const existingDir = curDir.directories.find((dir) => dir.name === dirName);
  if (existingDir) {
    // console.log(
    //   `Get dir - curDir: ${curDir.name} existingDir: ${existingDir.name}`
    // );
    return existingDir;
  }

  const newDir = new Dir(dirName, curDir);
  //console.log(`Creating dir - curDir: ${curDir.name} newDir: ${newDir.name}`);
  curDir.directories.push(newDir);
  return newDir;
}

class Dir {
  constructor(
    public name: string,
    public parent?: Dir,
    public directories: Dir[] = [],
    public files: Filz[] = []
  ) {}
}

class Filz {
  constructor(public name: string, public size: number) {}
}

type DirInfo = {
  name: string;
  size: number;
};
