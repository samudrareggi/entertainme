import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function LoadingSkeleton(props) {
  return (
    <div style={{ height: "100%", backgroundColor: "#121212" }}>
      <div className="container pt-5">
        <div className="d-flex row pt-4">

          {Array(8)
            .fill()
            .map((_, index) => (
              <SkeletonTheme key={"ls" + index} color="#0f1a2a" highlightColor="#444">
                <div className="p-2 col3">
                  <Skeleton width={265} height={540} />
                </div>
              </SkeletonTheme>
            ))}
        </div>
      </div>
    </div>
  )

}