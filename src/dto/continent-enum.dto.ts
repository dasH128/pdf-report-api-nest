import { continents } from '@prisma/client';
import { IsEnum } from 'class-validator';

const ContinentEnumList = [
  continents.Africa,
  continents.Antarctica,
  continents.Asia,
  continents.Europe,
  continents.Oceania,
  continents.North_America,
  continents.South_America,
];

export class ContinentEnumDto {
  @IsEnum(ContinentEnumList, {
    message: `Possible continent values are ${ContinentEnumList}`,
  })
  continent: continents;
}
