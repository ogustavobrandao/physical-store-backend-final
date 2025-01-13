import { Module } from "@nestjs/common";
import { ViaCepModule } from "./viacep/viacep.module";
import { OrsModule } from "./ors/ors.module";
import { GeoCodeModule } from "./geocode/geocode.module";
import { CorreioModule } from "./correios/correios.module";

@Module({
    imports: [ViaCepModule, OrsModule, GeoCodeModule, CorreioModule],
    exports: [ViaCepModule, OrsModule, GeoCodeModule, CorreioModule],
})
export class ApiModule{}