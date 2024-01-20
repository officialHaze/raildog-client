export default interface LiveStatusData {
  id: string;
  station_name: string;
  at_this_stn: boolean;
  is_no_halt_stn: boolean;
  deprt_time: string;
  arrival_time: string;
  platform_no: number;
  distance_from_src_km: string;
  is_wifi_available: boolean;
}
