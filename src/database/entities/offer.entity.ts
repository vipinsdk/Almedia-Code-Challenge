import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsNotEmpty, IsString, IsUrl, MaxLength} from 'class-validator';
import { IOffer } from '../../common/offer.interface';


@Entity('offers')
export class Offer implements IOffer {
  // primary column for offer id
  @PrimaryGeneratedColumn()
  id: number;

  // offer name
  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsString()
 @MaxLength(255)
  name: string;

  // unique identifier for offer
  @Column({ type: 'varchar', length: 255, unique: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  slug: string;

  // offer description 
  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  description: string;

  // offer requirements
  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  requirements: string;

  // offer thumbnail image url
  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MaxLength(255)
  thumbnail: string;

  // indicates if offer is available for desktop 
  @Column({ type: 'smallint', width: 1, default: 0, name: 'is_desktop' })
  @IsInt()
  isDesktop: number;

  // indicates if offer is available for android
  @Column({ type: 'smallint', width: 1, default: 0, name: 'is_android' })
  @IsInt()
  isAndroid: number;

  // indicates if offer is available for ios
  @Column({ type: 'smallint', width: 1, default: 0, name: 'is_ios' })
  @IsInt()
  isIos: number;

  // offer url template
  @Column({ type: 'varchar', length: 256, name: 'offer_url_template' })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MaxLength(256)
  offerUrlTemplate: string;

  // provider name - this should be static for each offer type
  // we're attaching two offer payloads - offer1, offer2
  // so for offer1 payload, this should be "offer1"
  // for offer2 payload, this should be "offer2"
  @Column({ type: 'varchar', length: 255, nullable: true, name: 'provider_name' })
  @IsString()
  @MaxLength(255)
  providerName: string;

  // offer id from external provider 
  @Column({ type: 'varchar', length: 255, name: 'external_offer_id', nullable: true })
  @IsString() 
  @MaxLength(255)
  externalOfferId: string;
}