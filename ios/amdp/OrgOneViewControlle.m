//
//  OrgOneViewControlle.m
//  amdp
//
//  Created by 田振 on 2019/3/4.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "OrgOneViewControlle.h"
#import "RNOneViewController.h"
#import <React/RCTRootView.h>
@interface OrgOneViewControlle (){
  UIButton *pushBtn;
}
@end

@implementation OrgOneViewControlle

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  self.view.backgroundColor = [UIColor yellowColor];
  self.title = @"原生控制器 One";
  pushBtn = [[UIButton alloc]initWithFrame:  CGRectMake(100, 100, 200, 80)];
  [pushBtn setTitle:@"跳到原生" forState:UIControlStateNormal];
  [pushBtn setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
  [pushBtn setBackgroundColor:[UIColor whiteColor]];
  [pushBtn addTarget:self action:@selector(clickPushRN) forControlEvents:UIControlEventTouchUpInside];
  [self.view addSubview:pushBtn];
  
}
-(void)clickPushRN{
  RNOneViewController *one = [[RNOneViewController alloc]init];
  [self.navigationController pushViewController:one animated:YES];
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
