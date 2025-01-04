import { BASEURL, getRequestWithParams } from "./main";
export class Bikes {
  async Get(params: any) {
    return await getRequestWithParams(`${BASEURL}/search`, params);
  }
  async GetById(id: number) {
    return await getRequestWithParams(`${BASEURL}/bikes/${id}`, null);
  }

  async Get_Counts() {
    return await getRequestWithParams(`${BASEURL}/search/count`, null);
  }

}

export const BikeInstance = new Bikes();
