energy_group012
===============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g energy_group012
$ energy_group012 COMMAND
running command...
$ energy_group012 (-v|--version|version)
energy_group012/0.0.0 linux-x64 node-v12.16.0
$ energy_group012 --help [COMMAND]
USAGE
  $ energy_group012 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`energy_group012 ActualTotalLoad`](#energy_group012-actualtotalload)
* [`energy_group012 Admin`](#energy_group012-admin)
* [`energy_group012 AggregatedGenerationPerType [FILE]`](#energy_group012-aggregatedgenerationpertype-file)
* [`energy_group012 Login`](#energy_group012-login)
* [`energy_group012 Logout`](#energy_group012-logout)
* [`energy_group012 help [COMMAND]`](#energy_group012-help-command)

## `energy_group012 ActualTotalLoad`

Search ActualTotalLoad Dataset

```
USAGE
  $ energy_group012 ActualTotalLoad

OPTIONS
  --apikey=apikey              (required)
  --area=area                  (required) Give Area Name to Search
  --date=date                  Give date like this : YYYY-MM-DD. Exclude to get Current Date
  --format=json|csv            [default: json] Output format : json | csv
  --timeres=PT15M|PT30M|PT60M  (required) Give Time Resolution
```

_See code: [src/commands/ActualTotalLoad.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/ActualTotalLoad.ts)_

## `energy_group012 Admin`

Admin priviliges only

```
USAGE
  $ energy_group012 Admin

OPTIONS
  -h, --help               show CLI help
  --email=email            Required
  --moduser=moduser        Modify user
  --newdata=newdata
  --newuser=newuser        Create new user
  --passw=passw            Required , no spaces allowed
  --quota=quota            Add user quota
  --source=source
  --userstatus=userstatus  Check userstatus
```

_See code: [src/commands/Admin.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/Admin.ts)_

## `energy_group012 AggregatedGenerationPerType [FILE]`

describe the command here

```
USAGE
  $ energy_group012 AggregatedGenerationPerType [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/AggregatedGenerationPerType.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/AggregatedGenerationPerType.ts)_

## `energy_group012 Login`

describe the command here

```
USAGE
  $ energy_group012 Login

OPTIONS
  -h, --help           show CLI help
  --passw=passw        (required) Required ,no spaces allowed
  --username=username  (required) Required
```

_See code: [src/commands/Login.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/Login.ts)_

## `energy_group012 Logout`

describe the command here

```
USAGE
  $ energy_group012 Logout
```

_See code: [src/commands/Logout.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/Logout.ts)_

## `energy_group012 help [COMMAND]`

display help for energy_group012

```
USAGE
  $ energy_group012 help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
