import { PartialType } from "@nestjs/swagger";
import { AssignShiftDto } from "./assign-shift.dto";

export class UpdateUserShiftDto extends PartialType(AssignShiftDto) {}
