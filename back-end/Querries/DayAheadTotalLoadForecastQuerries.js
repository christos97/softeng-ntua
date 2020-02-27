module.exports ={ 

  Get_Date_Querry     : function(_AreaName,_Resolution,_Year,_Month,_Day){
      Q= [
        {
          $match:
          {
            AreaName: _AreaName,
            Day: _Day,
            Month: _Month,
            Year: _Year
          }
        },
    
        {
          $lookup:
          {
            from: 'ResolutionCode',
            localField: 'ResolutionCodeId',
            foreignField: 'Id',
            as: "resolution_codes"
          }
        },
        {
          $unwind: { path: "$resolution_codes" }
        },
    
        {
          $match: { 'resolution_codes.ResolutionCodeText': _Resolution }
        },
        {
          $lookup: {
            from: 'MapCode',
            localField: 'MapCodeId',
            foreignField: 'Id',
            as: 'Map_Code'
          }
        }, {
          $unwind: {
            path: '$Map_Code'
          }
        }, {
          $lookup: {
            from: 'AreaTypeCode',
            localField: 'AreaTypeCodeId',
            foreignField: 'Id',
            as: 'Area_Type_Code'
          }
        }, {
          $unwind: {
            path: '$Area_Type_Code'
          }
        },
        {
          $project:
          {
            _id: 0,
            Source: 'entso-e',
            Dataset: 'DayAheadTotalLoadForecast',
            AreaName: '$AreaName',
            AreaTypeCode: '$Area_Type_Code.AreaTypeCodeText',
            MapCode: '$Map_Code.MapCodeText',
            ResolutionCode: '$resolution_codes.ResolutionCodeText',
            Year :   { $toInt : "$Year" } ,
            Month :   { $toInt : "$Month"} ,
            Day :     { $toInt :"$Day"} ,
            DateTimeUTC:  { $toDate : '$DateTime'  },
            DayAheadTotalLoadForecast: { $toDouble: "$TotalLoadValue" },
            UpdateTimeUTC:  { $toDate :'$UpdateTime'}
          }
        },
        {
          $sort: {
            'DateTime': 1
          }
        }
      ];
        return Q
    
    },

  Get_Month_Querry    : function(_AreaName,_Resolution,_Year,_Month,_Day){
      Q= [{
        $match: {
          AreaName: _AreaName,
          Year: _Year,
          Month: _Month
        }
      }, {
        $group: {
          _id: {
            Year: "$Year",
            Month: "$Month",
            Day: "$Day",
            AreaName: "$AreaName",
            AreaTypeCodeId: "$AreaTypeCodeId",
            AreaCodeId: "$AreaCodeId",
            ResolutionCodeId: "$ResolutionCodeId",
            MapCodeId: "$MapCodeId"
          },
          DayAheadTotalLoadForecastByDayValue: {
            $sum: {$toDouble:"$TotalLoadValue"}
          },
        }
      }, {
        $lookup: {
          'from': 'ResolutionCode',
          'localField': '_id.ResolutionCodeId',
          'foreignField': 'Id',
          'as': 'resolution_codes'
        }
      }, {
        $unwind: {
          path: '$resolution_codes'
        }
      }, {
        $match: {
          'resolution_codes.ResolutionCodeText': _Resolution
        }
      }, {
        $lookup: {
          from: 'MapCode',
          localField: '_id.MapCodeId',
          foreignField: 'Id',
          as: 'Map_Code'
        }
      }, {
        $unwind: {
          path: '$Map_Code'
        }
      }, {
        $lookup: {
          from: 'AreaTypeCode',
          localField: '_id.AreaTypeCodeId',
          foreignField: 'Id',
          as: 'Area_Type_Code'
        }
      }, {
        $unwind: {
    
    
          path: '$Area_Type_Code'
    
    
        }
      }, {
        $project: {
          _id: 0,
          Source: 'entso-e',
          Dataset: 'DayAheadTotalLoadForecast',
          AreaName: '$_id.AreaName',
          AreaTypeCode: '$Area_Type_Code.AreaTypeCodeText',
          MapCode: '$Map_Code.MapCodeText',
          ResolutionCode: '$resolution_codes.ResolutionCodeText',
          Year: { $toInt: '$_id.Year' },
          Month: { $toInt: '$_id.Month' },
          Day: { $toInt: '$_id.Day' },
          DayAheadTotalLoadForecastByDayValue: { $toDouble: '$DayAheadTotalLoadForecastByDayValue' }
        }
      }, {
        $sort: {
          Day: 1
        }
      }];

        return Q
  },
     
  Get_Year_Querry     : function(_AreaName,_Resolution,_Year){
       Q= [{
        $match: {
          AreaName: _AreaName,
          Year: _Year
        }
      }, {
        $group: {
          _id: {
            Year: "$Year",
            Month: "$Month",
            AreaName: "$AreaName",
            AreaTypeCodeId: "$AreaTypeCodeId",
            AreaCodeId: "$AreaCodeId",
            ResolutionCodeId: "$ResolutionCodeId",
            MapCodeId: "$MapCodeId"
          },
          DayAheadTotalLoadForecastByMonthValue: {
            $sum: {$toDouble:"$TotalLoadValue"}
          },
        }
      }, {
        $lookup: {
          'from': 'ResolutionCode',
          'localField': '_id.ResolutionCodeId',
          'foreignField': 'Id',
          'as': 'resolution_codes'
        }
      }, {
        $unwind: {
          path: '$resolution_codes'
        }
      }, {
        $match: {
          'resolution_codes.ResolutionCodeText': _Resolution
        }
      }, {
        $lookup: {
          from: 'MapCode',
          localField: '_id.MapCodeId',
          foreignField: 'Id',
          as: 'Map_Code'
        }
      }, {
        $unwind: {
          path: '$Map_Code'
        }
      }, {
        $lookup: {
          from: 'AreaTypeCode',
          localField: '_id.AreaTypeCodeId',
          foreignField: 'Id',
          as: 'Area_Type_Code'
        }
      }, {
        $unwind: {
    
    
          path: '$Area_Type_Code'
    
    
        }
      }, {
        $project: {
          _id: 0,
          Source: 'entso-e',
          Dataset: 'DayAheadTotalLoadForecast',
          AreaName: '$_id.AreaName',
          AreaTypeCode: '$Area_Type_Code.AreaTypeCodeText',
          MapCode: '$Map_Code.MapCodeText',
          ResolutionCode: '$resolution_codes.ResolutionCodeText',
          Year: { $toInt: '$_id.Year' },
          Month: { $toInt: '$_id.Month' },
          DayAheadTotalLoadForecastByMonthValue: { $toDouble: '$DayAheadTotalLoadForecastByMonthValue' }
        }
      }, {
        $sort: {
          Month: 1
        }
      }];
     
         return Q
     
     }
     
} 

