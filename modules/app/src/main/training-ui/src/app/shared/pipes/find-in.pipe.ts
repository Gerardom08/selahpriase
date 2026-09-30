import { Pipe, PipeTransform } from "@angular/core";
import { catsystemDto } from "../../components/interfaces/catsystemDto";

@Pipe({
    name: 'findIn'
  })
  export class FindInPipe implements PipeTransform {
  
    transform(value: string, catalogs: catsystemDto[] = []): string {
      const catalog = value && catalogs?.length > 0 ? catalogs.find(catalog => catalog.keyword === value) : null;
      if (catalog) {
        return catalog?.description??'';
      }
      return value;
    }
  
  }