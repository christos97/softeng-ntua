module.exports ={ 

    Get_Date_Querry     : function(_AreaName,_ProductionType,_Resolution,_Year,_Month,_Day){
        let Q;
        if(_ProductionType=='AllTypes'){
        Q = [{
    $match: {
        AreaName: _AreaName,
        Year: _Year,
        Month: _Month,
        Day: _Day
    }
}, {
    $lookup: {
        from: 'ResolutionCode',
        localField: 'ResolutionCodeId',
        foreignField: 'Id',
        as: 'resolution_codes'
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
    $group: {
        _id: {
            Year: '$Year',
            Month: '$Month',
            Day: '$Day',
            AreaName: '$AreaName',
            AreaTypeCodeId: '$AreaTypeCodeId',
            AreaCodeId: '$AreaCodeId',
            MapCodeId: '$MapCodeId',
            ProductionTypeId: '$ProductionTypeId',
            DateTime:'$DateTime' ,
            UpdateTime:  '$UpdateTime'
            
        },
        ActualGenerationOutputValue: {
            $first: '$ActualGenerationOutput'
        }
    }
}, {
    $lookup: {
        from: 'ProductionType',
        localField: '_id.ProductionTypeId',
        foreignField: 'Id',
        as: 'Production_Type'
    }
}, {
    $unwind: {
        path: '$Production_Type'
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
        Dataset: 'AggregatedGenerationPerType',
        AreaName: '$_id.AreaName',
        AreaTypeCode: '$Area_Type_Code.AreaTypeCodeText',
        MapCode: '$Map_Code.MapCodeText',
        ResolutionCode: _Resolution,
        Year: {
            $toInt: '$_id.Year'
        },
        Month: {
            $toInt: '$_id.Month'
        },
        Day: {
            $toInt: '$_id.Day'
        },
        DateTimeUTC: {
            $toDate: '$_id.DateTime'
        },
        ProductionType: '$Production_Type.ProductionTypeText',
        ActualGenerationOutputValue: {
            $toDouble: '$ActualGenerationOutputValue'
        },
        UpdateTimeUTC: {
            $toDate: '$_id.UpdateTime'
        }
    }
}, {
    $sort: {
        Month: 1
    }
}]
        return Q

    }
    else{ // ÎÎ¿t "AllTypes"
         Q= [{
            $match: {
                AreaName: _AreaName,
                Day: _Day,
                Month: _Month,
                Year: _Year
              }}, {
            $lookup: {
                from: 'ResolutionCode',
                localField: 'ResolutionCodeId',
                foreignField: 'Id',
                as: 'resolution_codes'
              }}, {$unwind: {path: '$resolution_codes'}
            }, {
                $match: {'resolution_codes.ResolutionCodeText': _Resolution}
            }, {
            $lookup: {
                from: 'ProductionType',
                localField: 'ProductionTypeId',
                foreignField: 'Id',
                as: 'Production_Type'
              }}, {$unwind: { path: '$Production_Type'}
            }, {
            $match: { 'Production_Type.ProductionTypeText': _ProductionType}
            }, {
            $lookup: {
                from: 'MapCode',
                localField: 'MapCodeId',
                foreignField: 'Id',
                as: 'Map_Code'
              }}, {$unwind: {path: '$Map_Code'
              }}, {
            $lookup: {
                from: 'AreaTypeCode',
                localField: 'AreaTypeCodeId',
                foreignField: 'Id',
                as: 'Area_Type_Code'
              }}, {$unwind: {path: '$Area_Type_Code'
              }}, {
            $project: {
                _id: 0,
                Source: 'entso-e',
                Dataset: 'AggregatedGenerationPerType',
                AreaName: '$AreaName',
                AreaTypeCode: '$Area_Type_Code.AreaTypeCodeText',
                MapCode: '$Map_Code.MapCodeText',
                ResolutionCode: '$resolution_codes.ResolutionCodeText',
                Year:  { $toInt: '$Year'},
                Month: {$toInt: '$Month' },
                Day:   {$toInt: '$Day'},
                ProductionType: _ProductionType,
                DateTimeUTC: {$toDate:'$DateTime'},
                ActualGenerationOutputValue: {$toDouble: '$ActualGenerationOutput' },
                UpdateTimeUTC: {$toDate:'$UpdateTime'}
              }}, 
              {
            $sort: { DateTime: 1 }
            }];
          return Q
        }
      },

    Get_Month_Querry    : function(_AreaName,_ProductionType,_Resolution,_Year,_Month,_Day){
        let Q
        if(_ProductionType != 'AllTypes'){ // Not 'AllTypes'

        Q = 
        [{
    $match: {
        AreaName: _AreaName,
        Year: _Year,
        Month: _Month
    }
}, {
    $lookup: {
        from: 'ResolutionCode',
        localField: 'ResolutionCodeId',
        foreignField: 'Id',
        as: 'resolution_codes'
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
        from: 'ProductionType',
        localField: 'ProductionTypeId',
        foreignField: 'Id',
        as: 'Production_Type'
    }
}, {
    $unwind: {
        path: '$Production_Type'
    }
}, {
    $match: {
        'Production_Type.ProductionTypeText': _ProductionType
    }
}, {
    $group: {
        _id: {
            Year: '$Year',
            Month: '$Month',
            Day: '$Day',
            AreaName: '$AreaName',
            AreaTypeCodeId: '$AreaTypeCodeId',
            AreaCodeId: '$AreaCodeId',
            ResolutionCodeId: '$ResolutionCodeId',
            MapCodeId: '$MapCodeId',
            ProductionTypeId: '$ProductionTypeId'
        },
        ActualGenerationOutputByDayValue: {
            $sum: {
                $toDouble: '$ActualGenerationOutput'
            }
        }
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
        Dataset: 'AggregatedGenerationPerType',
        AreaName: '$_id.AreaName',
        AreaTypeCode: '$Area_Type_Code.AreaTypeCodeText',
        MapCode: '$Map_Code.MapCodeText',
        ResolutionCode: _Resolution,
        Year: {
            $toInt: '$_id.Year'
        },
        Month: {
            $toInt: '$_id.Month'
        },
        Day: {
            $toInt: '$_id.Day'
        },
        ProductionType: _ProductionType,
        ActualGenerationOutputByDayValue: {
            $toDouble: '$ActualGenerationOutputByDayValue'
        }
    }
}, {
    $sort: {
        Day: 1
    }
}]
          return Q
    }
    else{   // ALL TYPES
        Q = 
        [{
    $match: {
        AreaName: _AreaName,
        Year: _Year,
        Month: _Month
    }
}, {
    $lookup: {
        from: 'ResolutionCode',
        localField: 'ResolutionCodeId',
        foreignField: 'Id',
        as: 'resolution_codes'
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
    $group: {
        _id: {
            Year: '$Year',
            Month: '$Month',
            Day: '$Day',
            AreaName: '$AreaName',
            AreaTypeCodeId: '$AreaTypeCodeId',
            AreaCodeId: '$AreaCodeId',
            ResolutionCodeId: '$ResolutionCodeId',
            MapCodeId: '$MapCodeId',
            ProductionTypeId: '$ProductionTypeId'
        },
        ActualGenerationOutputByDayValue: {
            $sum: {
                $toDouble: '$ActualGenerationOutput'
            }
        }
    }
}, {
    $lookup: {
        from: 'ProductionType',
        localField: '_id.ProductionTypeId',
        foreignField: 'Id',
        as: 'Production_Type'
    }
}, {
    $unwind: {
        path: '$Production_Type'
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
        Dataset: 'AggregatedGenerationPerType',
        AreaName: '$_id.AreaName',
        AreaTypeCode: '$Area_Type_Code.AreaTypeCodeText',
        MapCode: '$Map_Code.MapCodeText',
        ResolutionCode: _Resolution,
        Year: {
            $toInt: '$_id.Year'
        },
        Month: {
            $toInt: '$_id.Month'
        },
        Day: {
            $toInt: '$_id.Day'
        },
        ProductionType: '$Production_Type.ProductionTypeText',
        ActualGenerationOutputByDayValue: {
            $toDouble: '$ActualGenerationOutputByDayValue'
        }
    }
}, {
    $sort: {
        Day: 1
    }
}]
    //console.log("Q=",Q)
    return Q
    }
},
       
    Get_Year_Querry     : function(_AreaName,_ProductionType,_Resolution,_Year){
    let Q
        if(_ProductionType=='AllTypes'){
            Q = 
            [{
    $match: {
        AreaName: _AreaName,
        Year: _Year
    }
}, {
    $lookup: {
        from: 'ResolutionCode',
        localField: 'ResolutionCodeId',
        foreignField: 'Id',
        as: 'resolution_codes'
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
    $group: {
        _id: {
            Year: '$Year',
            Month: '$Month',
            AreaName: '$AreaName',
            AreaTypeCodeId: '$AreaTypeCodeId',
            AreaCodeId: '$AreaCodeId',
            ResolutionCodeId: '$ResolutionCodeId',
            MapCodeId: '$MapCodeId',
            ProductionTypeId: '$ProductionTypeId'
        },
        ActualGenerationOutputByMonthValue: {
            $sum: {
                $toDouble: '$ActualGenerationOutput'
            }
        }
    }
}, {
    $lookup: {
        from: 'ProductionType',
        localField: '_id.ProductionTypeId',
        foreignField: 'Id',
        as: 'Production_Type'
    }
}, {
    $unwind: {
        path: '$Production_Type'
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
        Dataset: 'AggregatedGenerationPerType',
        AreaName: '$_id.AreaName',
        AreaTypeCode: '$Area_Type_Code.AreaTypeCodeText',
        MapCode: '$Map_Code.MapCodeText',
        ResolutionCode: _Resolution,
        Year: {
            $toInt: '$_id.Year'
        },
        Month: {
            $toInt: '$_id.Month'
        },
        ProductionType: '$Production_Type.ProductionTypeText',
        ActualGenerationOutputByMonthValue: {
            $toDouble: '$ActualGenerationOutputByMonthValue'
        }
    }
}, {
    $sort: {
        Month: 1
    }
}]
            console.log('I am here in ALLTYPES YEAR')
            return Q
        }
        else{
    
        Q = 
        [{
    $match: {
        AreaName: _AreaName,
        Year: _Year
    }
}, {
    $lookup: {
        from: 'ResolutionCode',
        localField: 'ResolutionCodeId',
        foreignField: 'Id',
        as: 'resolution_codes'
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
        from: 'ProductionType',
        localField: 'ProductionTypeId',
        foreignField: 'Id',
        as: 'Production_Type'
    }
}, {
    $unwind: {
        path: '$Production_Type'
    }
}, {
    $match: {
        'Production_Type.ProductionTypeText': _ProductionType
    }
}, {
    $group: {
        _id: {
            Year: '$Year',
            Month: '$Month',
            AreaName: '$AreaName',
            AreaTypeCodeId: '$AreaTypeCodeId',
            AreaCodeId: '$AreaCodeId',
            ResolutionCodeId: '$ResolutionCodeId',
            MapCodeId: '$MapCodeId',
            ProductionTypeId: '$ProductionTypeId'
        },
        ActualGenerationOutputByMonthValue: {
            $sum: {
                $toDouble: '$ActualGenerationOutput'
            }
        }
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
        Dataset: 'AggregatedGenerationPerType',
        AreaName: '$_id.AreaName',
        AreaTypeCode: '$Area_Type_Code.AreaTypeCodeText',
        MapCode: '$Map_Code.MapCodeText',
        ResolutionCode: _Resolution,
        Year: {
            $toInt: '$_id.Year'
        },
        Month: {
            $toInt: '$_id.Month'
        },
        ProductionType: _ProductionType,
        ActualGenerationOutputByMonthValue: '$ActualGenerationOutputByMonthValue'

    }
}, {
    $sort: {
        Month: 1
    }
}]
       
           return Q
    }
},
}