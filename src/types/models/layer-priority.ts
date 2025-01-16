import { Layer } from "./layer";
import { Priority } from "./priority";

export interface LayerPriority {
  id: number | string;
  name: string;
  layerId?: number;
  priorityId?: number;
  selfParentId?: number | null;
  createdAt?: string;
  updatedAt?: string;
  layer: string;
  priority: string;
}

export interface PopulatedLayerPriority {
  id: number;
  name: string;
  layerId: number;
  priorityId: number;
  selfParentId: number | null;
  createdAt: string;
  updatedAt: string;
  layer: Layer;
  priority: Priority;
}

export interface LayerPriorityResponse {
  status: boolean;
  path: string;
  statusCode: number;
  message: string;
  data: LayerPriority[];
  timestamp: string;
}

// Type for creating a new Layer Priority
export interface CreateLayerPriority {
  name: string;
  priorityId: number;
  layerId: number;
}

// Type for updating an existing Layer Priority
export interface UpdateLayerPriority {
  name?: string;
  priorityId?: number;
  layerId?: number;
}
