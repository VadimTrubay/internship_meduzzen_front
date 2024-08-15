import {AxiosResponse} from "axios";

export const downloadFileData = (response: AxiosResponse<any>) => {
        const blob = new Blob([response.data], {type: response.headers['content-type']});
      const link = document.createElement('a');
      const filename = response.headers['content-disposition']?.match(/filename="(.+)"/)?.[1] || 'results.csv';

      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      link.remove();
}