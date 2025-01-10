import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { GeoCodeService } from "./geocode.service";

@Module({
    imports: [HttpModule],
    providers: [GeoCodeService],
    exports: [GeoCodeService]
})
export class GeoCodeModule{}