//
//  BuzModule.m
//  amdp
//
//  Created by 田振 on 2019/3/2.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "BuzModule.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCTBridge.h"
#import "AppDelegate.h"
#import <React/RCTBridge+Private.h>
@interface BuzModule(){
  RCTBridge *bridge;
}
@end
@implementation BuzModule
RCT_EXPORT_MODULE();

- (NSDictionary *)baseInfomation {
  return @{ @"name": @"FlyElephant" };
}

RCT_EXPORT_METHOD(showMessage:(NSString *)message type:(NSString *)type)
{
  NSString *moduleName = @"reactnative_multibundler";
  NSString *bundleName = @"index.ios";
  RCTLogInfo(@"FlyElephant 本地调用 %@---%@---", message, type);
  /**
  NSURL *jsCodeLocationBuz = [[NSBundle mainBundle] URLForResource:bundleName withExtension:@"bundle"];
  NSError *error = nil;
  NSData *sourceBuz = [NSData dataWithContentsOfFile:jsCodeLocationBuz.path
                                             options:NSDataReadingMappedIfSafe
                                               error:&error];
  bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocationBuz
                                 moduleProvider:nil
                                  launchOptions:nil];
  [bridge.batchedBridge executeSourceCode:sourceBuz sync:NO];
  RCTRootView* view = [[RCTRootView alloc] initWithBridge:bridge moduleName:moduleName initialProperties:nil];
  UIViewController *controller = [UIViewController new];
  [controller setView:view];
  //[mainViewController.navigationController pushViewController:controller animated:YES];
//
  //务必在主线程中执行跳转操作
  dispatch_async(dispatch_get_main_queue(), ^{

    [self presentViewController:controller animated: YES completion:nil];
  });
  **/
  
}
@end
