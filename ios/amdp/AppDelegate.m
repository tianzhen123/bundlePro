/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCTBridge.h"
#import <React/RCTBridge+Private.h>
#import "OrgOneViewControlle.h"
#import "RNOneViewController.h"
@interface AppDelegate(){
  OrgOneViewControlle *orgCon;
  RNOneViewController *oneCon;
  RCTBridge * bridge;
}
@end
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  NSURL *jsCodeLocation;
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"platform.ios" withExtension:@"bundle"];
  bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation
                                             moduleProvider:nil
                                              launchOptions:launchOptions];
#pragma mark  start 打开原生界面，并在原生界面打开 RN 界面
   //原生跳转到RN
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  //orgCon = [[OrgOneViewControlle alloc]init];
  oneCon = [[RNOneViewController alloc]init];
  UINavigationController * nav = [[UINavigationController alloc]initWithRootViewController:oneCon];
  self.window.rootViewController = nav;
  
  [self.window makeKeyAndVisible];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(clickPushBundle:) name:@"openBundle" object:nil];
  oneCon.navigationController.navigationBar.hidden=YES;
#pragma mark end 打开原生界面，并在原生界面打开 RN 界面

#pragma mark start 直接打开 RN 界面
  /** 直接打开 RN 界面
  NSURL *jsCodeLocationRN;
  jsCodeLocationRN = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocationRN
                                                      moduleName:@"amdp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [UIColor blackColor];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.rootViewController = [[UIViewController alloc]init];
  
  UINavigationController *nav = [[UINavigationController alloc]initWithRootViewController:self.rootViewController];
  nav.title=@"rn";

  self.rootViewController.view = rootView;
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(clickPushBundle) name:@"openBundle" object:nil];
  self.window.rootViewController = self.rootViewController;
  [self.window makeKeyAndVisible];
  **/
#pragma mark end 直接打开 RN 界面
  return YES;
}
-(void)clickPushBundle:(NSNotification *) bundleName{
  
  NSError *error = nil;
  

#if 0
#pragma mark 加载工程目录下的 bundle文件
  
  NSURL *jsCodeLocationBuz = [[NSBundle mainBundle] URLForResource:bundleName.object[@"bundleName"] withExtension:@"bundle"];
  NSData *sourceBuz = [NSData dataWithContentsOfFile:jsCodeLocationBuz.path
                                             options:NSDataReadingMappedIfSafe
                                               error:&error];
  
#else
#pragma mark 加载从服务器下载的 bundle文件
  NSData *sourceBuz = [NSData dataWithContentsOfFile:bundleName.object[@"bundleName"]
                                             options:NSDataReadingMappedIfSafe
                                               error:&error];
#endif
  [bridge.batchedBridge executeSourceCode:sourceBuz sync:NO];
  RCTRootView* view = [[RCTRootView alloc] initWithBridge:bridge moduleName:bundleName.object[@"moduleName"] initialProperties:nil];
  UIViewController* controller = [UIViewController new];
  [controller setView:view];
  
  [oneCon.navigationController pushViewController:controller animated:YES];
  controller.navigationController.navigationBar.hidden = YES;
  //[oneCon.navigationController presentViewController:controller animated:YES completion:nil];
}
@end
