#import "ThreadSelfManager.h"
#include <stdlib.h>

@implementation ThreadSelfManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;
@synthesize parentBridge = _parentBridge;
@synthesize threadId = _threadId;

RCT_EXPORT_METHOD(postMessage: (NSArray *)message)
{
  if (self.parentBridge == nil) {
    NSLog(@"No parent bridge defined - abort sending thread message");
    return;
  }
  
  NSString *eventName = [NSString stringWithFormat:@"onNative%i", self.threadId];
  [self.parentBridge.eventDispatcher sendAppEventWithName:eventName body:message];
}

@end
