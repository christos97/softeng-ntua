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
$ cd energy_group012 && sudo npm install --save && sudo npm link
$ energy_group012 [COMMAND]
$ energy_group012 --help
$ energy_group012 --help [COMMAND]
USAGE
  $ energy_group012 COMMAND --flag1 value1 --flag2 value2 ...
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`energy_group012 ActualTotalLoad`](#energy_group012-actualtotalload)
* [`energy_group012 ActualvsForecast`](#energy_group012-actualvsforecast)
* [`energy_group012 Admin`](#energy_group012-admin)
* [`energy_group012 AggregatedGenerationPerType`](#energy_group012-aggregatedgenerationpertype)
* [`energy_group012 DayAheadTotalLoadForecast`](#energy_group012-dayaheadtotalloadforecast)
* [`energy_group012 HealthCheck`](#energy_group012-healthcheck)
* [`energy_group012 Login`](#energy_group012-login)
* [`energy_group012 Logout [FILE]`](#energy_group012-logout-file)
* [`energy_group012 Reset`](#energy_group012-reset)
* [`energy_group012 help [COMMAND]`](#energy_group012-help-command)

## `energy_group012 ActualTotalLoad`

Search ActualTotalLoad Dataset

```
USAGE
  $ energy_group012 ActualTotalLoad

OPTIONS
  --apikey=apikey              (required)
  --area=area                  (required) Give Area Name to Search
  --date=date                  Date format : YYYY-MM-DD. Exclude to get Current Date
  --format=json|csv            [default: json] Output format : json | csv
  --timeres=PT15M|PT30M|PT60M  (required) Give Time Resolution
```

_See code: [src/commands/ActualTotalLoad.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/ActualTotalLoad.ts)_

## `energy_group012 ActualvsForecast`

Search ActualvsForecast Dataset

```
USAGE
  $ energy_group012 ActualvsForecast

OPTIONS
  --apikey=apikey              (required)
  --area=area                  (required) Give Area Name to Search
  --date=date                  Date format : YYYY-MM-DD. Exclude to get Current Date
  --format=json|csv            [default: json] Output format : json | csv
  --timeres=PT15M|PT30M|PT60M  (required) Give Time Resolution
```

_See code: [src/commands/ActualvsForecast.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/ActualvsForecast.ts)_

## `energy_group012 Admin`

Admin priviliges only

```
USAGE
  $ energy_group012 Admin

OPTIONS
  -h, --help                                 show CLI help
  
  --newuser newuser && --moduser moduser     Create / Modify user
    --email email                            Unique,Required
    --passw passw                            Unique,Required
    --quota quota                            Add/Modify user quota
  
  --newdata newdata
    --source source
  
  --userstatus userstatus                    Check userstatus
```

_See code: [src/commands/Admin.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/Admin.ts)_

## `energy_group012 AggregatedGenerationPerType`

Search AggregatedGenerationPerType Dataset

```
USAGE
  $ energy_group012 AggregatedGenerationPerType

OPTIONS
  --apikey=apikey                  (required)
  --area=area                      (required) Give Area Name to Search
  --date=date                      Date format : YYYY-MM-DD. Exclude to get Current Date
  --format=json|csv                [default: json] Output format : json | csv
  --productiontype=productiontype  [default: AllTypes] Give Generation Type
  --timeres=PT15M|PT30M|PT60M      (required) Give Time Resolution
```

_See code: [src/commands/AggregatedGenerationPerType.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/AggregatedGenerationPerType.ts)_

## `energy_group012 DayAheadTotalLoadForecast`

Search DayAheadTotalLoadForecast Dataset

```
USAGE
  $ energy_group012 DayAheadTotalLoadForecast

OPTIONS
  --apikey=apikey              (required)
  --area=area                  (required) Give Area Name to Search
  --date=date                  Date format : YYYY-MM-DD. Exclude to get Current Date
  --format=json|csv            [default: json] Output format : json | csv
  --timeres=PT15M|PT30M|PT60M  (required) Give Time Resolution
```

_See code: [src/commands/DayAheadTotalLoadForecast.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/DayAheadTotalLoadForecast.ts)_

## `energy_group012 HealthCheck`

Check e2e connectivity

```
USAGE
  $ energy_group012 HealthCheck
```

_See code: [src/commands/HealthCheck.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/HealthCheck.ts)_

## `energy_group012 Login`

Login to use Energy CLI

```
USAGE
  $ energy_group012 Login

OPTIONS
  -h, --help           show CLI help
  --passw=passw        (required) Required ,no spaces allowed
  --username=username  (required) Required
```

_See code: [src/commands/Login.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/Login.ts)_

## `energy_group012 Logout [FILE]`

describe the command here

```
USAGE
  $ energy_group012 Logout [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/Logout.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/Logout.ts)_

## `energy_group012 Reset`

Drop collections

```
USAGE
  $ energy_group012 Reset
```

_See code: [src/commands/Reset.ts](https://github.com/christos97/softeng-ntua/blob/v0.0.0/src/commands/Reset.ts)_

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
