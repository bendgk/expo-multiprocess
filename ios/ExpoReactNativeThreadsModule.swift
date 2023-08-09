import ExpoModulesCore

public class ExpoReactNativeThreadsModule: Module {
  var threads: [Int32: RCTBridge] = [:]
  var threadId: Int32 = 0
  var unusedIds: [Int32] = []

  private func getRCTBridge() throws -> RCTBridge {
    guard let bridge = self.appContext?.reactBridge else {
      throw Exception(name: "BridgeNotFoundException", description: "Could not find a react-native bridge!")
    }

    return bridge
  } 

  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoReactNativeThreads')` in JavaScript.
    Name("ExpoReactNativeThreads")
    Events("onJs")

    Function("startThread") { (name: String) -> Int32 in
      //pick an unused thread id or if there are none, use the current thread id and increment it
      let id = self.unusedIds.popLast() ?? self.threadId
      if id == self.threadId {
        self.threadId += 1
      }
      
      do {
        let bridge = try getRCTBridge()
        let modules = appContext?.getModuleNames()
        
        let threadUrl = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: name)
        guard let threadBridge = RCTBridge(bundleURL: threadUrl, moduleProvider: nil, launchOptions: nil) else {
          throw Exception(name: "BridgeNotFoundException", description: "Could not find a react-native bridge!")
        }
        
        if let threadSelf = threadBridge.module(forName: "ThreadSelfManager") as? ThreadSelfManager {
          threadSelf.threadId = threadId
          threadSelf.parentBridge = bridge
        }
        
        threads[threadId] = threadBridge
        return threadId
      } catch {
        return -1
      }
    }
      
    Function("postThreadMessage") { (id: Int32, message: String) -> Void in
      if (threads.isEmpty) {
        return
      }
      
      let threadBridge = threads[threadId]
      
      if (threadBridge == nil) {
        return
      }
      
      threadBridge?.eventDispatcher()?.sendAppEvent(withName: "onJs", body: [
        "id": id,
        "message": message
      ])
    }
      
    Function("stopThread") { (id: Int32) -> Void in
      if (threads.isEmpty) {
        return
      }
      
      let threadBridge = threads[threadId]
      
      if (threadBridge == nil) {
        return
      }
      
      threadBridge?.invalidate()
      threads[threadId] = nil
      
      self.unusedIds.append(id)
    }
  }
  
  private func invalidate() {
    if (threads.isEmpty) {
      return
    }

    for (_, threadBridge) in threads {
        threadBridge.invalidate()
    }

    threads.removeAll()
  }
}
