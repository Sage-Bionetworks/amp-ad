import React from "react"

const PopularDataRequests = (props) => {
  return (
    <section className="popular-data-requests row center-xs">
      <div className="col-xs-12 col-sm-9 col-md-9">
        <div className="row start-xs">
          <div className="col-xs-12">
            <h2>
Popular Data Requests
            </h2>
          </div>
        </div>
        <div className="row most-popular-data center-xs">
          <div className="col-sm-4 popular-col">
            <img
              src={require("./images/magnifying-glass.svg")}
              alt="dna double helix"
              className="svg-large-icon"
            />
            <div className="row center-xs">
              <div className="col-xs-12 col-sm-10">
                <div className="pop-assay-title row middle-xs">
                  <h5>
Most Popular Assays
                  </h5>
                </div>
                <div className="pop-assay row center-xs middle-xs around-xs">
                  <div className="pop-circle col-xs" />
                  <p className="pop-list-item col-xs">
                    <a href="https://www.synapse.org/#!Synapse:syn11346063/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjExMzQ2MDYzIiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJzcGVjaWVzIiwgImZhY2V0VmFsdWVzIjpbIkh1bWFuIl19LHsiY29uY3JldGVUeXBlIjoib3JnLnNhZ2ViaW9uZXR3b3Jrcy5yZXBvLm1vZGVsLnRhYmxlLkZhY2V0Q29sdW1uVmFsdWVzUmVxdWVzdCIsICJjb2x1bW5OYW1lIjoiYXNzYXkiLCAiZmFjZXRWYWx1ZXMiOlsicm5hU2VxIl19XSwgImluY2x1ZGVFbnRpdHlFdGFnIjp0cnVlLCAiaXNDb25zaXN0ZW50Ijp0cnVlLCAib2Zmc2V0IjowLCAibGltaXQiOjI1fQ==">
                      rnaSEQ: Human
                    </a>
                  </p>
                </div>
                <div className="pop-assay row middle-xs around-xs">
                  <div className="pop-circle col-xs" />
                  <p className="pop-list-item col-xs">
                    <a href="https://www.synapse.org/#!Synapse:syn11346063/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjExMzQ2MDYzIiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJzcGVjaWVzIiwgImZhY2V0VmFsdWVzIjpbIkh1bWFuIl19LHsiY29uY3JldGVUeXBlIjoib3JnLnNhZ2ViaW9uZXR3b3Jrcy5yZXBvLm1vZGVsLnRhYmxlLkZhY2V0Q29sdW1uVmFsdWVzUmVxdWVzdCIsICJjb2x1bW5OYW1lIjoiYXNzYXkiLCAiZmFjZXRWYWx1ZXMiOlsiTEMtTVNNUyJdfV0sICJpbmNsdWRlRW50aXR5RXRhZyI6dHJ1ZSwgImlzQ29uc2lzdGVudCI6dHJ1ZSwgIm9mZnNldCI6MCwgImxpbWl0IjoyNX0=">
                      LC-MSMS: Human
                    </a>
                  </p>
                </div>
                <div className="pop-assay row middle-xs around-xs">
                  <div className="pop-circle col-xs" />
                  <p className="pop-list-item col-xs">
                    <a href="https://www.synapse.org/#!Synapse:syn11346063/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjExMzQ2MDYzIiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJhc3NheSIsICJmYWNldFZhbHVlcyI6WyJybmFTZXEiXX0seyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJzcGVjaWVzIiwgImZhY2V0VmFsdWVzIjpbIk1vdXNlIl19XSwgImluY2x1ZGVFbnRpdHlFdGFnIjp0cnVlLCAiaXNDb25zaXN0ZW50Ijp0cnVlLCAib2Zmc2V0IjowLCAibGltaXQiOjI1fQ==">
                      rnaSEQ: Mouse
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4 popular-col">
            <img
              src={require("./images/brain.svg")}
              alt="two dna double helix and arrows going from one to the other in a circular pattern"
              className="svg-large-icon"
            />

            <div className="row center-xs">
              <div className="col-xs-12 col-sm-10">
                <div className="pop-assay-title row middle-xs">
                  <h5>
Most Popular Tissues
                  </h5>
                </div>
                <div className="pop-assay row center-xs middle-xs">
                  <div className="pop-circle col-xs" />
                  <p className="pop-list-item col-xs">
                    <a href="https://www.synapse.org/#!Synapse:syn11346063/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjExMzQ2MDYzIiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJzcGVjaWVzIiwgImZhY2V0VmFsdWVzIjpbIkh1bWFuIl19LHsiY29uY3JldGVUeXBlIjoib3JnLnNhZ2ViaW9uZXR3b3Jrcy5yZXBvLm1vZGVsLnRhYmxlLkZhY2V0Q29sdW1uVmFsdWVzUmVxdWVzdCIsICJjb2x1bW5OYW1lIjoiYXNzYXkiLCAiZmFjZXRWYWx1ZXMiOltdfSx7ImNvbmNyZXRlVHlwZSI6Im9yZy5zYWdlYmlvbmV0d29ya3MucmVwby5tb2RlbC50YWJsZS5GYWNldENvbHVtblZhbHVlc1JlcXVlc3QiLCAiY29sdW1uTmFtZSI6InRpc3N1ZSIsICJmYWNldFZhbHVlcyI6WyJ0ZW1wb3JhbCBjb3J0ZXgiXX1dLCAiaW5jbHVkZUVudGl0eUV0YWciOnRydWUsICJpc0NvbnNpc3RlbnQiOnRydWUsICJvZmZzZXQiOjAsICJsaW1pdCI6MjV9">
                      Temporal cortex: Human
                    </a>
                  </p>
                </div>
                <div className="pop-assay row middle-xs">
                  <div className="pop-circle col-xs" />
                  <p className="pop-list-item col-xs">
                    <a href="https://www.synapse.org/#!Synapse:syn11346063/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjExMzQ2MDYzIiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJzcGVjaWVzIiwgImZhY2V0VmFsdWVzIjpbIkh1bWFuIl19LHsiY29uY3JldGVUeXBlIjoib3JnLnNhZ2ViaW9uZXR3b3Jrcy5yZXBvLm1vZGVsLnRhYmxlLkZhY2V0Q29sdW1uVmFsdWVzUmVxdWVzdCIsICJjb2x1bW5OYW1lIjoiYXNzYXkiLCAiZmFjZXRWYWx1ZXMiOltdfSx7ImNvbmNyZXRlVHlwZSI6Im9yZy5zYWdlYmlvbmV0d29ya3MucmVwby5tb2RlbC50YWJsZS5GYWNldENvbHVtblZhbHVlc1JlcXVlc3QiLCAiY29sdW1uTmFtZSI6InRpc3N1ZSIsICJmYWNldFZhbHVlcyI6WyJwcmVmcm9udGFsIGNvcnRleCJdfV0sICJpbmNsdWRlRW50aXR5RXRhZyI6dHJ1ZSwgImlzQ29uc2lzdGVudCI6dHJ1ZSwgIm9mZnNldCI6MCwgImxpbWl0IjoyNX0=">
                      Prefrontal cortex: Human
                    </a>
                  </p>
                </div>
                <div className="pop-assay row middle-xs">
                  <div className="pop-circle col-xs" />
                  <p className="pop-list-item col-xs">
                    <a href="https://www.synapse.org/#!Synapse:syn11346063/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjExMzQ2MDYzIiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJzcGVjaWVzIiwgImZhY2V0VmFsdWVzIjpbIkh1bWFuIl19LHsiY29uY3JldGVUeXBlIjoib3JnLnNhZ2ViaW9uZXR3b3Jrcy5yZXBvLm1vZGVsLnRhYmxlLkZhY2V0Q29sdW1uVmFsdWVzUmVxdWVzdCIsICJjb2x1bW5OYW1lIjoiYXNzYXkiLCAiZmFjZXRWYWx1ZXMiOltdfSx7ImNvbmNyZXRlVHlwZSI6Im9yZy5zYWdlYmlvbmV0d29ya3MucmVwby5tb2RlbC50YWJsZS5GYWNldENvbHVtblZhbHVlc1JlcXVlc3QiLCAiY29sdW1uTmFtZSI6InRpc3N1ZSIsICJmYWNldFZhbHVlcyI6WyJjZXJlYmVsbHVtIl19XSwgImluY2x1ZGVFbnRpdHlFdGFnIjp0cnVlLCAiaXNDb25zaXN0ZW50Ijp0cnVlLCAib2Zmc2V0IjowLCAibGltaXQiOjI1fQ==">
                      Cerebellum: Human
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopularDataRequests
