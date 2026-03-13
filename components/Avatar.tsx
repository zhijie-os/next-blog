import * as THREE from 'three'
import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'

// 1. Updated the Type definition to match a standard Mesh
type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.Mesh // Changed from THREE.SkinnedMesh
  }
  materials: {
    [key: string]: THREE.MeshStandardMaterial 
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/avatar.glb')
  
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone) as GLTFResult

  return (
    <group {...props} dispose={null}>
      {/* 2. Map your actual mesh_0 using a standard <mesh> tag */}
      {nodes.mesh_0 && (
        <mesh 
          name="mesh_0" 
          geometry={nodes.mesh_0.geometry} 
          material={nodes.mesh_0.material} 
        />
      )}
    </group>
  )
}

useGLTF.preload('/avatar.glb')