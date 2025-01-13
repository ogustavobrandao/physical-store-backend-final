import { Module } from "@nestjs/common";
import { ViaCepModule } from "./viacep/viacep.module";
import { OrsModule } from "./ors/ors.module";
import { GeoCodeModule } from "./geocode/geocode.module";

@Module({
    imports: [ViaCepModule, OrsModule, GeoCodeModule],
    exports: [ViaCepModule, OrsModule, GeoCodeModule],
})
export class ApiModule{}