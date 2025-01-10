import { Module } from "@nestjs/common";
import { ViaCepService } from "./viacep/viacep.service";
import { OrsService } from "./ors/ors.service";
import { GeoCodeService } from "./geocode/geocode.service";

@Module({
    imports: [ViaCepService, OrsService, GeoCodeService],
    exports: [ViaCepService, OrsService, GeoCodeService],
})
export class ApiModule{}