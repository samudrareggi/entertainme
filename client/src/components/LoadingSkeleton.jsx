import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function LoadingSkeleton(props) {
  return (
    <div className="container pt-5" style={{ height: "100%" }}>
      <div className="d-flex row pt-4">

      {Array(8)
        .fill()
        .map((_, index) => (
          <SkeletonTheme key={"ls"+index} color="#202020" highlightColor="#444">
            <div className="p-2 col3">
              <Skeleton width={265} height={540}/>
            </div>
          </SkeletonTheme>
        ))}
    </div>
    </div>

  )

}