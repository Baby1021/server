export interface CreateGeoFenceResponse {
  data: {
    gid: string;
    id: string;
    message: string;
    status: string;
  };
  errcode: number;
  errdetail?: any;
  errmsg: string;
  ext?: any;
}

export interface GeoFenceCheckResponse {
  data: {
    fencing_event_list: {
      client_status: string;
      client_action: string;
      enter_time: string;
      fence_info: {
        fence_gid: string;
        fence_center: string;
        fence_name: string;
      };
    }[];
    nearest_fence_distance: string;
    nearest_fence_gid: string;
    status: number;
  };
  errcode: number;
  errdetail?: any;
  errmsg: string;
  ext?: any;
}

