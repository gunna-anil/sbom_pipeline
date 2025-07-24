/**
 * @name Eval Reachability Analysis
 * @description Finds flow from function inputs to eval calls
 * @kind path-problem
 * @tags security
 */

import javascript
import semmle.javascript.security.dataflow.TaintTracking

class EvalSink extends DataFlow::SinkNode {
  EvalCall call;
  EvalSink(EvalCall call) { this.call = call }
  override predicate isSink(DataFlow::Node node) { node = call.getNode() }
}

from DataFlow::PathNode source, EvalSink sink
where DataFlow::localFlow(source, sink)
select sink, source, "Data from here reaches eval sink."
