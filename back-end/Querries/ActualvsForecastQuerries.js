module.exports ={ 

    Get_Date_Querry     : function(_AreaName,_Resolution,_Year,_Month,_Day){
  
  Q= 
  [{
    $match: {
        AreaName: _AreaName,
        Day: _Day,
        Month: _Month,
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
  }, {
    $lookup: {
        from: 'ActualTotalLoad',
        'let': {
            actualTotalLoadValue: '$TotalLoadValue',
            area_Type_Id_Actual: '$AreaTypeCodeId',
            reso_Code_Id_Actual: '$ResolutionCodeId',
            map_Code_Id_Actual: '$MapCodeId',
            area_Name_Actual: '$AreaName',
            y: '$Year',
            m: '$Month',
            d: '$Day'
        },
        pipeline: [{
                $match: {
                    $expr: {
                        $and: [{
                                $eq: [
                                    '$AreaTypeCodeId',
                                    '$$area_Type_Id_Actual'
                                ]
                            },
                            {
                                $eq: [
                                    '$ResolutionCodeId',
                                    '$$reso_Code_Id_Actual'
                                ]
                            },
                            {
                                $eq: [
                                    '$MapCodeId',
                                    '$$map_Code_Id_Actual'
                                ]
                            },
                            {
                                $eq: [
                                    '$AreaName',
                                    '$$area_Name_Actual'
                                ]
                            },
                            {
                                $eq: [
                                    '$Year',
                                    '$$y'
                                ]
                            },
                            {
                                $eq: [
                                    '$Month',
                                    '$$m'
                                ]
                            },
                            {
                                $eq: [
                                    '$Day',
                                    '$$d'
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ],
        as: 'Actual_Total_Load'
    }
  }, {
    $unwind: {
        path: '$Actual_Total_Load'
    }
  }, {
    $project: {
        _id: 0,
        Source: 'entso-e',
        Dataset: 'ActualVSForecastedTotalLoad',
        AreaName: '$AreaName',
        AreaTypeCode: '$Area_Type_Code.AreaTypeCodeText',
        MapCode: '$Map_Code.MapCodeText',
        ResolutionCode: '$resolution_codes.ResolutionCodeText',
        Year: {
            $toInt: '$Year'
        },
        Month: {
            $toInt: '$Month'
        },
        Day: {
            $toInt: '$Day'
        },
        DateTimeUTC: {
            $toDate: '$DateTime'
        },
        DayAheadTotalLoadForecastValue: {
            $toDouble: '$TotalLoadValue'
        },
        ActualTotalLoadValue: {
            $toDouble: '$Actual_Total_Load.TotalLoadValue'
        }
    }
  },  {
      $sort: {
          DateTimeUTC: 1
      }
    }
  ]
          return Q
      
      },
  
  
  
  
    Get_Month_Querry    : function(_AreaName,_Resolution,_Year,_Month){
      Q= 
  
  // Pipeline
  [
    // Stage 1
    {
      $match: {
          AreaName: _AreaName,
          Month: _Month,
          Year: _Year
      }
    },
  
    // Stage 2
    {
      $lookup: {
          from: 'ResolutionCode',
          localField: 'ResolutionCodeId',
          foreignField: 'Id',
          as: 'resolution_codes'
      }
    },
  
    // Stage 3
    {
      $unwind: {
          path: '$resolution_codes'
      }
    },
  
    // Stage 4
    {
      $match: {
          'resolution_codes.ResolutionCodeText': _Resolution
      }
    },
  
    // Stage 5
    {
      $lookup: {
          from: 'ActualTotalLoad',
          'let': {
              actualTotalLoadValue: '$TotalLoadValue',
              area_Type_Id_Actual: '$AreaTypeCodeId',
              reso_Code_Id_Actual: '$ResolutionCodeId',
              map_Code_Id_Actual: '$MapCodeId',
              area_Name_Actual: '$AreaName',
              y: '$Year',
              m: '$Month',
              d: '$Day'
          },
          pipeline: [{
                  $match: {
                      $expr: {
                          $and: [{
                                  $eq: [
                                      '$AreaTypeCodeId',
                                      '$$area_Type_Id_Actual'
                                  ]
                              },
                              {
                                  $eq: [
                                      '$ResolutionCodeId',
                                      '$$reso_Code_Id_Actual'
                                  ]
                              },
                              {
                                  $eq: [
                                      '$MapCodeId',
                                      '$$map_Code_Id_Actual'
                                  ]
                              },
                              {
                                  $eq: [
                                      '$AreaName',
                                      '$$area_Name_Actual'
                                  ]
                              },
                              {
                                  $eq: [
                                      '$Year',
                                      '$$y'
                                  ]
                              },
                              {
                                  $eq: [
                                      '$Month',
                                      '$$m'
                                  ]
                              },
                              {
                                  $eq: [
                                      '$Day',
                                      '$$d'
                                  ]
                              }
                          ]
                      }
                  }
              },
              {
                  $project: {
                      _id: 0
                  }
              }
          ],
          as: 'Actual_Total_Load'
      }
    },
  
    // Stage 6
    {
      $replaceRoot: {
          newRoot: {
              $mergeObjects: [{
                      $arrayElemAt: [
                          '$Actual_Total_Load',
                          0
                      ]
                  },
                  {
                      ActualTotalLoad: '$$ROOT.TotalLoadValue'
                  }
              ]
          }
      }
    },
  
    // Stage 7
    {
      $group: {
          _id: {
              Day: '$Day',
              Year: '$Year',
              Month: '$Month',
              AreaName: '$AreaName',
              AreaTypeCodeId: '$AreaTypeCodeId',
              AreaCodeId: '$AreaCodeId',
              ResolutionCodeId: '$ResolutionCodeId',
              MapCodeId: '$MapCodeId'
          },
          DayAheadTotalLoadForecast: {
              $sum: {
                  $toDouble: '$TotalLoadValue'
              }
          },
          ActualTotalLoadByDayValue: {
              $sum: {
                  $toDouble: '$ActualTotalLoad'
              }
          }
      }
    },
  
    // Stage 8
    {
      $lookup: {
          from: 'MapCode',
          localField: '_id.MapCodeId',
          foreignField: 'Id',
          as: 'Map_Code'
      }
    },
  
    // Stage 9
    {
      $unwind: {
          path: '$Map_Code'
      }
    },
  
    // Stage 10
    {
      $lookup: {
          from: 'AreaTypeCode',
          localField: '_id.AreaTypeCodeId',
          foreignField: 'Id',
          as: 'Area_Type_Code'
      }
    },
  
    // Stage 11
    {
      $unwind: {
          path: '$Area_Type_Code'
      }
    },
  
    // Stage 12
    {
      $project: {
          _id: 0,
          Source: 'entso-e',
          Dataset: 'ActualVSForecastedTotalLoad',
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
          DayAheadTotalLoadForecastByDayValue: {
              $toDouble: '$DayAheadTotalLoadForecast'
          },
          ActualTotalLoadByDayValue: {
              $toDouble: '$ActualTotalLoadByDayValue'
          }
      }
    },
  
    // Stage 13
    {
      $sort: {
          Day: 1
      }
    }
  
  ];
  
  return Q
  },
       
  
  
  
    Get_Year_Querry     : function(_AreaName,_Resolution,_Year){
         Q=  [
            {$match: {
              AreaName: _AreaName,
              Year: _Year
            }},{
                $lookup: {
                  'from': 'ResolutionCode', 
                  'localField': 'ResolutionCodeId', 
                  'foreignField': 'Id', 
                  'as': 'resolution_codes'
                }}, {
                    $unwind: {
                        path: '$resolution_codes'
                }}, {
                    $match: {
                    'resolution_codes.ResolutionCodeText': _Resolution
             }},{
                $lookup: {
                    from: 'ActualTotalLoad',
                    let:{
                        actualTotalLoadValue:"$TotalLoadValue",
                        area_Type_Id_Actual:"$AreaTypeCodeId",
                        reso_Code_Id_Actual:"$ResolutionCodeId",
                        map_Code_Id_Actual:"$MapCodeId",
                        area_Name_Actual:"$AreaName",
                        y:"$Year",
                        m:"$Month"
                    },
                    pipeline: [
                        { $match:
                           { $expr:
                              { $and:
                                 [
                                   { $eq: [ "$AreaTypeCodeId",  "$$area_Type_Id_Actual" ] },
                                   { $eq: [ "$ResolutionCodeId",  "$$reso_Code_Id_Actual" ] },
                                   { $eq: [ "$MapCodeId",  "$$map_Code_Id_Actual" ] },
                                   { $eq: [ "$AreaName",  "$$area_Name_Actual" ] },
                                   { $eq: [ "$Year",  "$$y" ] },
                                   { $eq: [ "$Month",  "$$m" ] }
                                 ]
                              }
                           }
                        },
                        { $project: {  
                            _id: 0
                        } }
                     ],
                     as: "Actual_Total_Load"
                }
              },{
                $unwind: {
                  path: '$Actual_Total_Load'
                }
              },{
        $group: {
              _id: {
                Year:"$Year",
                Month:"$Month", 
                AreaName: "$AreaName",
                AreaTypeCodeId:"$AreaTypeCodeId",
                AreaCodeId:"$AreaCodeId",
                ResolutionCodeId:"$ResolutionCodeId",
                MapCodeId:"$MapCodeId"
              },
              DayAheadTotalLoadForecast: {
                $sum: {$toDouble:"$TotalLoadValue"}
              },
              ActualTotalLoadByDayValue:{
                  $sum : { $toDouble:
        "$Actual_Total_Load.TotalLoadValue" }
              }
            }},  {$lookup: {
              from: 'MapCode',
              localField: '_id.MapCodeId',
              foreignField: 'Id',
              as: 'Map_Code'
            }}, {$unwind: {
              path: '$Map_Code'
            }}, {$lookup: {
              from: 'AreaTypeCode',
              localField: '_id.AreaTypeCodeId',
              foreignField: 'Id',
              as: 'Area_Type_Code'
            }}, {
                $unwind: { path:'$Area_Type_Code'}
            }, {
        $project: {
              _id:0,
              Source: 'entso-e',
              Dataset: 'ActualVSForecastedTotalLoad',
              AreaName: '$_id.AreaName',
              AreaTypeCode: '$Area_Type_Code.AreaTypeCodeText',
              MapCode: '$Map_Code.MapCodeText',
              ResolutionCode: _Resolution,
              Year: { $toInt:'$_id.Year'},
              Month: { $toInt:'$_id.Month'},
              DayAheadTotalLoadForecastByMonthValue: { $toDouble:'$DayAheadTotalLoadForecast'},
              ActualTotalLoadByMonthValue : { $toDouble:'$ActualTotalLoadByDayValue'}
            }}, 
    
            {$sort: {Month: 1}
        }];
       
           return Q
       
       }
       
  }// export module ends here