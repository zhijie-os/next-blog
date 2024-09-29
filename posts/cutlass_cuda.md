---
title: 'Cuda implementation for mutiplication to illustrate CUTLASS'
date: '2024-09-29'
---

~~~c

#include <iostream>
#include <cuda_runtime.h>

__global__ void inner_product_kernel(float *a, float *b, float *c, int N) {
    int index = threadIdx.x + blockIdx.x * blockDim.x;
    if (index < N) {
        atomicAdd(c, a[index] * b[index]);
    }
}

int main() {
    int N = 1000000;  // Large vector size

    // Host memory allocation
    float *h_a, *h_b, h_c = 0;
    h_a = (float*)malloc(N * sizeof(float));
    h_b = (float*)malloc(N * sizeof(float));

    // Initialize vectors with random values
    for (int i = 0; i < N; i++) {
        h_a[i] = static_cast<float>(rand()) / RAND_MAX;
        h_b[i] = static_cast<float>(rand()) / RAND_MAX;
    }

    // Device memory allocation
    float *d_a, *d_b, *d_c;
    cudaMalloc((void**)&d_a, N * sizeof(float));
    cudaMalloc((void**)&d_b, N * sizeof(float));
    cudaMalloc((void**)&d_c, sizeof(float));

    // Copy vectors to device
    cudaMemcpy(d_a, h_a, N * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, h_b, N * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_c, &h_c, sizeof(float), cudaMemcpyHostToDevice);

    // Kernel configuration
    int blockSize = 256;
    int numBlocks = (N + blockSize - 1) / blockSize;

    // Launch kernel
    inner_product_kernel<<<numBlocks, blockSize>>>(d_a, d_b, d_c, N);

    // Copy result back to host
    cudaMemcpy(&h_c, d_c, sizeof(float), cudaMemcpyDeviceToHost);

    // Print result
    std::cout << "Inner product: " << h_c << std::endl;

    // Free memory
    cudaFree(d_a);
    cudaFree(d_b);
    cudaFree(d_c);
    free(h_a);
    free(h_b);

    return 0;
}

~~~

and 

~~~c

#include <iostream>
#include <cuda_runtime.h>

#define M 1024  // Rows of A and C
#define N 1024  // Columns of B and C
#define K 1024  // Columns of A and rows of B

__global__ void outer_product_kernel(float *A, float *B, float *C) {
    int row = blockIdx.y * blockDim.y + threadIdx.y;
    int col = blockIdx.x * blockDim.x + threadIdx.x;

    if (row < M && col < N) {
        float value = 0;
        for (int k = 0; k < K; ++k) {
            value += A[row * K + k] * B[k * N + col];
        }
        C[row * N + col] = value;
    }
}

int main() {
    // Host memory allocation
    float *h_A, *h_B, *h_C;
    h_A = (float*)malloc(M * K * sizeof(float));
    h_B = (float*)malloc(K * N * sizeof(float));
    h_C = (float*)malloc(M * N * sizeof(float));

    // Initialize matrices A and B with random values, and C to zero
    for (int i = 0; i < M * K; i++) {
        h_A[i] = static_cast<float>(rand()) / RAND_MAX;
    }
    for (int i = 0; i < K * N; i++) {
        h_B[i] = static_cast<float>(rand()) / RAND_MAX;
    }
    for (int i = 0; i < M * N; i++) {
        h_C[i] = 0.0f; // initialize C to zero
    }

    // Device memory allocation
    float *d_A, *d_B, *d_C;
    cudaMalloc((void**)&d_A, M * K * sizeof(float));
    cudaMalloc((void**)&d_B, K * N * sizeof(float));
    cudaMalloc((void**)&d_C, M * N * sizeof(float));

    // Copy matrices to device
    cudaMemcpy(d_A, h_A, M * K * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, h_B, K * N * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_C, h_C, M * N * sizeof(float), cudaMemcpyHostToDevice);

    // Kernel configuration
    dim3 threadsPerBlock(16, 16);
    dim3 numBlocks((N + threadsPerBlock.x - 1) / threadsPerBlock.x,
                   (M + threadsPerBlock.y - 1) / threadsPerBlock.y);

    // Launch kernel
    outer_product_kernel<<<numBlocks, threadsPerBlock>>>(d_A, d_B, d_C);

    // Copy result back to host
    cudaMemcpy(h_C, d_C, M * N * sizeof(float), cudaMemcpyDeviceToHost);

    // Print part of the result to verify (e.g., the first element)
    std::cout << "Outer product result (C[0][0]): " << h_C[0] << std::endl;

    // Free memory
    cudaFree(d_A);
    cudaFree(d_B);
    cudaFree(d_C);
    free(h_A);
    free(h_B);
    free(h_C);

    return 0;
}
~~~