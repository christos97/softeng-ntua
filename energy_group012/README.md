energy_group012 CLI Reference
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
* [`energy_group012 Login`](#energy_group012-login)
* [`energy_group012 Logout`](#energy_group012-logout)
* [`energy_group012 Admin`](#energy_group012-admin)
* [`energy_group012 ActualTotalLoad`](#energy_group012-actualtotalload)
* [`energy_group012 ActualvsForecast`](#energy_group012-actualvsforecast)
* [`energy_group012 AggregatedGenerationPerType`](#energy_group012-aggregatedgenerationpertype)
* [`energy_group012 DayAheadTotalLoadForecast`](#energy_group012-dayaheadtotalloadforecast)
* [`energy_group012 HealthCheck`](#energy_group012-healthcheck)
* [`energy_group012 Reset`](#energy_group012-reset)
* [`energy_group012 help`](#energy_group012-help-command)


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


## `energy_group012 Logout`

describe the command here

```
USAGE
  $ energy_group012 Logout

OPTIONS
  -f, --force
  -h, --help       show CLI help
```


## `energy_group012 Admin`

Admin priviliges only

```
USAGE
  $ energy_group012 Admin

OPTIONS
  -h, --help               show CLI help
  --moduser=username        Modify user
  --newuser=username        Create new user
    --email=email            Required
    --passw=passw            Required , no spaces allowed
    --quota=quota            Required 
  
  --newdata=newdata
      --source=file.csv
  
  --userstatus=username  Check userstatus
```


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


## `energy_group012 AggregatedGenerationPerType`

Search AggregatedGenerationPerType Dataset

```
USAGE
  $ energy_group012 AggregatedGenerationPerType

OPTIONS
  --area=area                      (required) Give Area Name to Search
  --date=date                      Date format : YYYY-MM-DD. Exclude to get Current Date
  --format=json|csv                [default: json] Output format : json | csv
  --productiontype=productiontype  [default: AllTypes] Give Generation Type
  --timeres=PT15M|PT30M|PT60M      (required) Give Time Resolution
```

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

## `energy_group012 HealthCheck`

Check e2e connectivity

```
USAGE
  $ energy_group012 HealthCheck
```

## `energy_group012 Reset`

Drop collections

```
USAGE
  $ energy_group012 Reset
```


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

<!-- commandsstop -->
