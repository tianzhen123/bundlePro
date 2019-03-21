//
//  RNOneViewController.m
//  amdp
//
//  Created by 田振 on 2019/3/4.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "RNOneViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCTBridge.h"
#import <React/RCTBridge+Private.h>
@interface RNOneViewController ()

@end

@implementation RNOneViewController
- (void)dealloc{
  [[NSNotificationCenter defaultCenter]removeObserver:self];
}
-(void)viewWillAppear:(BOOL)animated{
  self.navigationController.navigationBar.hidden = YES;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  self.navigationItem.title = @"RN界面";

  NSURL *jsCodeLocation;
#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"amdp"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.backgroundColor = [UIColor blackColor];
  self.view = rootView;
  //[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(clickBack) name:@"BackToViewController" object:nil];
}
- (void)clickBack{
  [self.navigationController popViewControllerAnimated:YES];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
