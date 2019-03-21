//
//  RNBridgeModule.m
//  amdp
//
//  Created by 田振 on 2019/3/4.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "RNBridgeModule.h"

@implementation RNBridgeModule
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(backToViewController:(NSDictionary *)name){
  //务必在主线程中执行跳转操作
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[NSNotificationCenter defaultCenter]postNotificationName:@"openBundle" object:name];
    
  });
}

@end
