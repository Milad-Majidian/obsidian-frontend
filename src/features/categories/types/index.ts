
export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryResponse {
    success: boolean;
    data: Category[];
}

export interface CategoryRequest {
    name: string;
    description: string;
    image: string;
}
