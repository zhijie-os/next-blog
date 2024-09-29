# Cuda implementation for mutiplication to illustrate CUTLASS

```
#include <stdio.h>

__global__ void innerProduct(float *A, float *B, float *C, int N) {
    __shared__ float temp[256];  // Shared memory for partial results
    int tid = threadIdx.x + blockIdx.x * blockDim.x;
    int thread_id = threadIdx.x;
    temp[thread_id] = 0;

    if (tid < N) {
        temp[thread_id] = A[tid] * B[tid];
    }

    // Synchronize threads in the block
    __syncthreads();

    // Reduce results within the block
    for (int stride = blockDim.x / 2; stride > 0; stride >>= 1) {
        if (thread_id < stride) {
            temp[thread_id] += temp[thread_id + stride];
        }
        __syncthreads();
    }

    // Accumulate block results in global memory
    if (thread_id == 0) {
        atomicAdd(C, temp[0]);
    }
}

int main() {
    int N = 1024;
    float *A, *B, *C;
    float *d_A, *d_B, *d_C;

    // Allocate host memory
    A = (float*)malloc(N * sizeof(float));
    B = (float*)malloc(N * sizeof(float));
    C = (float*)malloc(sizeof(float));
    *C = 0;

    // Initialize vectors
    for (int i = 0; i < N; i++) {
        A[i] = i + 1;
        B[i] = i + 1;
    }

    // Allocate device memory
    cudaMalloc((void**)&d_A, N * sizeof(float));
    cudaMalloc((void**)&d_B, N * sizeof(float));
    cudaMalloc((void**)&d_C, sizeof(float));

    // Copy data to device
    cudaMemcpy(d_A, A, N * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, B, N * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_C, C, sizeof(float), cudaMemcpyHostToDevice);

    // Launch kernel with 256 threads per block
    int blockSize = 256;
    int numBlocks = (N + blockSize - 1) / blockSize;
    innerProduct<<<numBlocks, blockSize>>>(d_A, d_B, d_C, N);

    // Copy result back to host
    cudaMemcpy(C, d_C, sizeof(float), cudaMemcpyDeviceToHost);

    printf("Inner Product: %f\n", *C);

    // Free memory
    cudaFree(d_A);
    cudaFree(d_B);
    cudaFree(d_C);
    free(A);
    free(B);
    free(C);

    return 0;
}
```

and 
```
#include <stdio.h>

#define M 4  // Number of rows in A
#define N 4  // Number of columns in B
#define K 4  // Common dimension (columns of A, rows of B)

__global__ void matrixMultiplyOuterProduct(float *A, float *B, float *C) {
    int row = threadIdx.y;
    int col = threadIdx.x;

    // Each thread computes a partial sum for C[row][col]
    float sum = 0;
    for (int k = 0; k < K; k++) {
        sum += A[row * K + k] * B[k * N + col];
    }

    C[row * N + col] = sum;
}

int main() {
    // Host matrices
    float A[M * K] = {1, 2, 3, 4,
                      5, 6, 7, 8,
                      9, 10, 11, 12,
                      13, 14, 15, 16};
    
    float B[K * N] = {1, 2, 3, 4,
                      5, 6, 7, 8,
                      9, 10, 11, 12,
                      13, 14, 15, 16};

    float C[M * N] = {0};  // Output matrix C

    float *d_A, *d_B, *d_C;

    // Allocate device memory
    cudaMalloc((void**)&d_A, M * K * sizeof(float));
    cudaMalloc((void**)&d_B, K * N * sizeof(float));
    cudaMalloc((void**)&d_C, M * N * sizeof(float));

    // Copy data to device
    cudaMemcpy(d_A, A, M * K * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, B, K * N * sizeof(float), cudaMemcpyHostToDevice);

    // Define block and grid size
    dim3 threadsPerBlock(N, M);  // Each thread computes one element of the matrix
    dim3 numBlocks(1, 1);

    // Launch kernel
    matrixMultiplyOuterProduct<<<numBlocks, threadsPerBlock>>>(d_A, d_B, d_C);

    // Copy result back to host
    cudaMemcpy(C, d_C, M * N * sizeof(float), cudaMemcpyDeviceToHost);

    printf("Matrix C (Result of A * B):\n");
    for (int i = 0; i < M; i++) {
        for (int j = 0; j < N; j++) {
            printf("%f ", C[i * N + j]);
        }
        printf("\n");
    }

    // Free memory
    cudaFree(d_A);
    cudaFree(d_B);
    cudaFree(d_C);

    return 0;
}
```