import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  UUID: { input: any; output: any };
};

export enum AddonType {
  HomePickup = 'HOME_PICKUP',
  HomeWrapping = 'HOME_WRAPPING',
}

export type AddressCoordinates = {
  __typename?: 'AddressCoordinates';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type Article = {
  __typename?: 'Article';
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  imagePath: Scalars['String']['output'];
  isEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  variants: Array<ArticleVariant>;
};

export type ArticleInput = {
  id: Scalars['String']['input'];
};

export type ArticleOutput = {
  __typename?: 'ArticleOutput';
  article: Article;
};

export type ArticlePricingRule = IPricingRule & {
  __typename?: 'ArticlePricingRule';
  article: PricingRuleArticle;
  articleVariant: PricingRuleArticleVariant;
  deliveryType: PricingRuleDeliveryType;
  id: Scalars['UUID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  location: PricingRuleLocation;
  partner: PricingRulePartner;
  price: Scalars['Int']['output'];
  type: PricingRuleType;
};

export type ArticleVariant = {
  __typename?: 'ArticleVariant';
  id: Scalars['UUID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type ArticlesInput = {
  _?: InputMaybe<Scalars['String']['input']>;
};

export type ArticlesOutput = {
  __typename?: 'ArticlesOutput';
  articles: Array<Article>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ChangePasswordOutput = {
  __typename?: 'ChangePasswordOutput';
  _?: Maybe<Scalars['String']['output']>;
};

export type CitiesInput = {
  stateId: Scalars['UUID']['input'];
};

export type CitiesOutput = {
  __typename?: 'CitiesOutput';
  cities: Array<City>;
};

export type City = {
  __typename?: 'City';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  zipCodes: Array<Scalars['String']['output']>;
};

export type CityInput = {
  id: Scalars['UUID']['input'];
};

export type CityOutput = {
  __typename?: 'CityOutput';
  city: City;
};

export type ClientUser = IUser & {
  __typename?: 'ClientUser';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isEnabled: Scalars['Boolean']['output'];
  isPhoneVerified: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  partner: UserPartner;
  phone: Scalars['String']['output'];
  type: UserType;
};

export type ClientUserInput = {
  id: Scalars['UUID']['input'];
};

export type ClientUserOutput = {
  __typename?: 'ClientUserOutput';
  clientUser: ClientUser;
};

export type ClientUsersInput = {
  pagination?: InputMaybe<Pagination>;
  partnerId?: InputMaybe<Scalars['UUID']['input']>;
  sorting?: InputMaybe<Sorting>;
};

export type ClientUsersOutput = {
  __typename?: 'ClientUsersOutput';
  clientUsers: Array<ClientUser>;
  total: Scalars['Int']['output'];
};

export type CountriesInput = {
  _?: InputMaybe<Scalars['String']['input']>;
};

export type CountriesOutput = {
  __typename?: 'CountriesOutput';
  countries: Array<Country>;
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type CountryInput = {
  id: Scalars['UUID']['input'];
};

export type CountryOutput = {
  __typename?: 'CountryOutput';
  country: Country;
};

export type CreateArticleInput = {
  description: Scalars['String']['input'];
  imagePath: Scalars['String']['input'];
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateArticleOutput = {
  __typename?: 'CreateArticleOutput';
  article: Article;
};

export type CreateArticlePricingRuleInput = {
  articleId: Scalars['UUID']['input'];
  articleVariantId: Scalars['UUID']['input'];
  deliveryTypeId: Scalars['UUID']['input'];
  isEnabled: Scalars['Boolean']['input'];
  locationId: Scalars['UUID']['input'];
  partnerId: Scalars['UUID']['input'];
  price: Scalars['Int']['input'];
};

export type CreateArticlePricingRuleOutput = {
  __typename?: 'CreateArticlePricingRuleOutput';
  articlePricingRule: ArticlePricingRule;
};

export type CreateArticleVariantInput = {
  articleId: Scalars['UUID']['input'];
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateArticleVariantOutput = {
  __typename?: 'CreateArticleVariantOutput';
  articleVariant: ArticleVariant;
};

export type CreateCityInput = {
  name: Scalars['String']['input'];
  stateId: Scalars['UUID']['input'];
  zipCodes: Array<Scalars['String']['input']>;
};

export type CreateCityOutput = {
  __typename?: 'CreateCityOutput';
  city: City;
};

export type CreateDeliveryTypeInput = {
  description: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateDeliveryTypeOutput = {
  __typename?: 'CreateDeliveryTypeOutput';
  deliveryType: DeliveryType;
};

export type CreateDriverUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  partnerId: Scalars['UUID']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateDriverUserOutput = {
  __typename?: 'CreateDriverUserOutput';
  driverUser: DriverUser;
};

export type CreateMunicipalityInput = {
  name: Scalars['String']['input'];
  provinceId: Scalars['UUID']['input'];
};

export type CreateMunicipalityOutput = {
  __typename?: 'CreateMunicipalityOutput';
  municipality: Municipality;
};

export type CreateNeighborhoodInput = {
  municipalityId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type CreateNeighborhoodOutput = {
  __typename?: 'CreateNeighborhoodOutput';
  neighborhood: Neighborhood;
};

export type CreatePartnerInput = {
  name: Scalars['String']['input'];
};

export type CreatePartnerOutput = {
  __typename?: 'CreatePartnerOutput';
  partner: Partner;
};

export type CreatePartnerUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  partnerId: Scalars['UUID']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreatePartnerUserOutput = {
  __typename?: 'CreatePartnerUserOutput';
  partnerUser: PartnerUser;
};

export type CreatePresignPutFileUrlInput = {
  fileName: Scalars['String']['input'];
  fileType: FileType;
};

export type CreatePresignPutFileUrlOutput = {
  __typename?: 'CreatePresignPutFileUrlOutput';
  path: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type CreateProvinceInput = {
  countryId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type CreateProvinceOutput = {
  __typename?: 'CreateProvinceOutput';
  province: Province;
};

export type CreateStaffUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  partnerId: Scalars['UUID']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateStaffUserOutput = {
  __typename?: 'CreateStaffUserOutput';
  staffUser: StaffUser;
};

export type CreateStateInput = {
  countryId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type CreateStateOutput = {
  __typename?: 'CreateStateOutput';
  state: State;
};

export type CurrentUserInput = {
  _?: InputMaybe<Scalars['String']['input']>;
};

export type CurrentUserOutput = {
  __typename?: 'CurrentUserOutput';
  user: User;
};

export type DeliveryOrder = Order & {
  __typename?: 'DeliveryOrder';
  addons: Array<OrderAddon>;
  client: OrderClient;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  discount: Scalars['Int']['output'];
  driver?: Maybe<OrderDriver>;
  externalId?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  items: Array<OrderItem>;
  partner: OrderPartner;
  paymentMethod: OrderPaymentMethod;
  recipient: OrderRecipient;
  sender: OrderSender;
  serviceType: ServiceType;
  status: OrderStatus;
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  vat: Scalars['Int']['output'];
};

export type DeliveryType = {
  __typename?: 'DeliveryType';
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type DeliveryTypeInput = {
  id: Scalars['UUID']['input'];
};

export type DeliveryTypeOutput = {
  __typename?: 'DeliveryTypeOutput';
  deliveryType: DeliveryType;
};

export type DeliveryTypesInput = {
  _?: InputMaybe<Scalars['String']['input']>;
};

export type DeliveryTypesOutput = {
  __typename?: 'DeliveryTypesOutput';
  deliveryTypes: Array<DeliveryType>;
};

export type DisableUserInput = {
  id: Scalars['UUID']['input'];
};

export type DisableUserOutput = {
  __typename?: 'DisableUserOutput';
  _?: Maybe<Scalars['String']['output']>;
};

export type DriverUser = IUser & {
  __typename?: 'DriverUser';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isEnabled: Scalars['Boolean']['output'];
  isPhoneVerified: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  partner: UserPartner;
  phone: Scalars['String']['output'];
  type: UserType;
};

export type DriverUserInput = {
  id: Scalars['UUID']['input'];
};

export type DriverUserOutput = {
  __typename?: 'DriverUserOutput';
  driverUser: DriverUser;
};

export type DriverUsersInput = {
  pagination?: InputMaybe<Pagination>;
  partnerId?: InputMaybe<Scalars['UUID']['input']>;
  sorting?: InputMaybe<Sorting>;
};

export type DriverUsersOutput = {
  __typename?: 'DriverUsersOutput';
  driverUsers: Array<DriverUser>;
  total: Scalars['Int']['output'];
};

export type DropOffOrderInput = {
  id: Scalars['UUID']['input'];
};

export type DropOffOrderOutput = {
  __typename?: 'DropOffOrderOutput';
  _?: Maybe<Scalars['String']['output']>;
};

export type EnableUserInput = {
  id: Scalars['UUID']['input'];
};

export type EnableUserOutput = {
  __typename?: 'EnableUserOutput';
  _?: Maybe<Scalars['String']['output']>;
};

export enum FileType {
  DriverLicenseBack = 'DRIVER_LICENSE_BACK',
  DriverLicenseFront = 'DRIVER_LICENSE_FRONT',
  DriverPhoto = 'DRIVER_PHOTO',
}

export type IOrderAddon = {
  id: Scalars['UUID']['output'];
  total: Scalars['Int']['output'];
  type: AddonType;
};

export type IOrderPaymentMethod = {
  id: Scalars['UUID']['output'];
  type: PaymentMethodType;
};

export type IOrderProduct = {
  price: Scalars['Int']['output'];
  type: OrderProductType;
};

export type IPricingRule = {
  deliveryType: PricingRuleDeliveryType;
  id: Scalars['UUID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  location: PricingRuleLocation;
  partner: PricingRulePartner;
  price: Scalars['Int']['output'];
  type: PricingRuleType;
};

export type IUser = {
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isEnabled: Scalars['Boolean']['output'];
  isPhoneVerified: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  partner: UserPartner;
  phone: Scalars['String']['output'];
  type: UserType;
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  type: LocationType;
};

export enum LocationType {
  Municipality = 'MUNICIPALITY',
  Neighborhood = 'NEIGHBORHOOD',
  Province = 'PROVINCE',
}

export type MunicipalitiesInput = {
  provinceId: Scalars['UUID']['input'];
};

export type MunicipalitiesOutput = {
  __typename?: 'MunicipalitiesOutput';
  municipalities: Array<Municipality>;
};

export type Municipality = {
  __typename?: 'Municipality';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type MunicipalityInput = {
  id: Scalars['UUID']['input'];
};

export type MunicipalityOutput = {
  __typename?: 'MunicipalityOutput';
  municipality: Municipality;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['String']['output']>;
  changePassword: ChangePasswordOutput;
  createArticle: CreateArticleOutput;
  createArticlePricingRule: CreateArticlePricingRuleOutput;
  createArticleVariant: CreateArticleVariantOutput;
  createCity: CreateCityOutput;
  createDeliveryType: CreateDeliveryTypeOutput;
  createDriverUser: CreateDriverUserOutput;
  createMunicipality: CreateMunicipalityOutput;
  createNeighborhood: CreateNeighborhoodOutput;
  createPartner: CreatePartnerOutput;
  createPartnerUser: CreatePartnerUserOutput;
  createPresignPutFileUrl: CreatePresignPutFileUrlOutput;
  createProvince: CreateProvinceOutput;
  createStaffUser: CreateStaffUserOutput;
  createState: CreateStateOutput;
  disableUser: DisableUserOutput;
  dropOffOrder: DropOffOrderOutput;
  enableUser: EnableUserOutput;
  refreshTokens: RefreshTokensOutput;
  sendEmailVerification: SendEmailVerificationOutput;
  sendPhoneVerification: SendPhoneVerificationOutput;
  signIn: SignInOutput;
  signOut: SignOutOutput;
  updateArticle: UpdateArticleOutput;
  updateArticlePricingRule: UpdateArticlePricingRuleOutput;
  updateArticleVariant: UpdateArticleVariantOutput;
  updateCity: UpdateCityOutput;
  updateDeliveryType: UpdateDeliveryTypeOutput;
  updateDriverUser: UpdateDriverUserOutput;
  updateMunicipality: UpdateMunicipalityOutput;
  updateNeighborhood: UpdateNeighborhoodOutput;
  updatePartner: UpdatePartnerOutput;
  updatePartnerUser: UpdatePartnerUserOutput;
  updateProvince: UpdateProvinceOutput;
  updateStaffUser: UpdateStaffUserOutput;
  updateState: UpdateStateOutput;
  verifyEmail: VerifyEmailOutput;
  verifyPhone: VerifyPhoneOutput;
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};

export type MutationCreateArticlePricingRuleArgs = {
  input: CreateArticlePricingRuleInput;
};

export type MutationCreateArticleVariantArgs = {
  input: CreateArticleVariantInput;
};

export type MutationCreateCityArgs = {
  input: CreateCityInput;
};

export type MutationCreateDeliveryTypeArgs = {
  input: CreateDeliveryTypeInput;
};

export type MutationCreateDriverUserArgs = {
  input: CreateDriverUserInput;
};

export type MutationCreateMunicipalityArgs = {
  input: CreateMunicipalityInput;
};

export type MutationCreateNeighborhoodArgs = {
  input: CreateNeighborhoodInput;
};

export type MutationCreatePartnerArgs = {
  input: CreatePartnerInput;
};

export type MutationCreatePartnerUserArgs = {
  input: CreatePartnerUserInput;
};

export type MutationCreatePresignPutFileUrlArgs = {
  input: CreatePresignPutFileUrlInput;
};

export type MutationCreateProvinceArgs = {
  input: CreateProvinceInput;
};

export type MutationCreateStaffUserArgs = {
  input: CreateStaffUserInput;
};

export type MutationCreateStateArgs = {
  input: CreateStateInput;
};

export type MutationDisableUserArgs = {
  input: DisableUserInput;
};

export type MutationDropOffOrderArgs = {
  input: DropOffOrderInput;
};

export type MutationEnableUserArgs = {
  input: EnableUserInput;
};

export type MutationRefreshTokensArgs = {
  input: RefreshTokensInput;
};

export type MutationSendEmailVerificationArgs = {
  input: SendEmailVerificationInput;
};

export type MutationSendPhoneVerificationArgs = {
  input: SendPhoneVerificationInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationSignOutArgs = {
  input: SignOutInput;
};

export type MutationUpdateArticleArgs = {
  input: UpdateArticleInput;
};

export type MutationUpdateArticlePricingRuleArgs = {
  input: UpdateArticlePricingRuleInput;
};

export type MutationUpdateArticleVariantArgs = {
  input: UpdateArticleVariantInput;
};

export type MutationUpdateCityArgs = {
  input: UpdateCityInput;
};

export type MutationUpdateDeliveryTypeArgs = {
  input: UpdateDeliveryTypeInput;
};

export type MutationUpdateDriverUserArgs = {
  input: UpdateDriverUserInput;
};

export type MutationUpdateMunicipalityArgs = {
  input: UpdateMunicipalityInput;
};

export type MutationUpdateNeighborhoodArgs = {
  input: UpdateNeighborhoodInput;
};

export type MutationUpdatePartnerArgs = {
  input: UpdatePartnerInput;
};

export type MutationUpdatePartnerUserArgs = {
  input: UpdatePartnerUserInput;
};

export type MutationUpdateProvinceArgs = {
  input: UpdateProvinceInput;
};

export type MutationUpdateStaffUserArgs = {
  input: UpdateStaffUserInput;
};

export type MutationUpdateStateArgs = {
  input: UpdateStateInput;
};

export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type MutationVerifyPhoneArgs = {
  input: VerifyPhoneInput;
};

export type Neighborhood = {
  __typename?: 'Neighborhood';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type NeighborhoodInput = {
  id: Scalars['UUID']['input'];
};

export type NeighborhoodOutput = {
  __typename?: 'NeighborhoodOutput';
  neighborhood: Neighborhood;
};

export type NeighborhoodsInput = {
  municipalityId: Scalars['UUID']['input'];
};

export type NeighborhoodsOutput = {
  __typename?: 'NeighborhoodsOutput';
  neighborhoods: Array<Neighborhood>;
};

export type Order = {
  addons: Array<OrderAddon>;
  client: OrderClient;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  discount: Scalars['Int']['output'];
  driver?: Maybe<OrderDriver>;
  externalId?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  items: Array<OrderItem>;
  partner: OrderPartner;
  paymentMethod: OrderPaymentMethod;
  sender: OrderSender;
  serviceType: ServiceType;
  status: OrderStatus;
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  vat: Scalars['Int']['output'];
};

export type OrderAddon = OrderHomePickupAddon | OrderHomeWrappingAddon;

export type OrderArticle = IOrderProduct & {
  __typename?: 'OrderArticle';
  deliveryType: OrderDeliveryType;
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  imagePath: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  type: OrderProductType;
  variant: OrderArticleVariant;
};

export type OrderArticleVariant = {
  __typename?: 'OrderArticleVariant';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type OrderCard = IOrderPaymentMethod & {
  __typename?: 'OrderCard';
  brand: Scalars['String']['output'];
  expMonth: Scalars['Int']['output'];
  expYear: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  last4: Scalars['String']['output'];
  type: PaymentMethodType;
};

export type OrderClient = {
  __typename?: 'OrderClient';
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
};

export type OrderContentType = {
  __typename?: 'OrderContentType';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type OrderDeliveryType = {
  __typename?: 'OrderDeliveryType';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type OrderDriver = {
  __typename?: 'OrderDriver';
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
  vehicle: OrderVehicle;
};

export type OrderHomePickupAddon = IOrderAddon & {
  __typename?: 'OrderHomePickupAddon';
  date: Scalars['Date']['output'];
  freeThresholdAmount: Scalars['Int']['output'];
  hourRange: OrderHomePickupAddonHourRange;
  id: Scalars['UUID']['output'];
  price: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  type: AddonType;
};

export type OrderHomePickupAddonHourRange = {
  __typename?: 'OrderHomePickupAddonHourRange';
  endAt: Scalars['String']['output'];
  startAt: Scalars['String']['output'];
};

export type OrderHomeWrappingAddon = IOrderAddon & {
  __typename?: 'OrderHomeWrappingAddon';
  date: Scalars['Date']['output'];
  freeThresholdAmount: Scalars['Int']['output'];
  hourRange: OrderHomeWrappingAddonHourRange;
  id: Scalars['UUID']['output'];
  price: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  type: AddonType;
};

export type OrderHomeWrappingAddonHourRange = {
  __typename?: 'OrderHomeWrappingAddonHourRange';
  endAt: Scalars['String']['output'];
  startAt: Scalars['String']['output'];
};

export type OrderInput = {
  id: Scalars['UUID']['input'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['UUID']['output'];
  product: OrderProduct;
  quantity: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type OrderLuggage = IOrderProduct & {
  __typename?: 'OrderLuggage';
  price: Scalars['Int']['output'];
  size: OrderLuggageSize;
  type: OrderProductType;
};

export type OrderLuggageSize = {
  __typename?: 'OrderLuggageSize';
  id: Scalars['UUID']['output'];
  price: Scalars['Int']['output'];
};

export type OrderOutput = {
  __typename?: 'OrderOutput';
  order: Order;
};

export type OrderPartner = {
  __typename?: 'OrderPartner';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type OrderPartnerBalance = IOrderPaymentMethod & {
  __typename?: 'OrderPartnerBalance';
  id: Scalars['UUID']['output'];
  type: PaymentMethodType;
};

export type OrderPaymentMethod = OrderCard | OrderPartnerBalance;

export type OrderProduct = OrderArticle | OrderLuggage;

export enum OrderProductType {
  Article = 'ARTICLE',
  Luggage = 'LUGGAGE',
  Package = 'PACKAGE',
}

export type OrderRecipient = {
  __typename?: 'OrderRecipient';
  address: OrderRecipientAddress;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  identityCardNumber: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
};

export type OrderRecipientAddress = {
  __typename?: 'OrderRecipientAddress';
  coordinates?: Maybe<AddressCoordinates>;
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  municipality: Scalars['String']['output'];
  neighborhood?: Maybe<Scalars['String']['output']>;
  postalCode: Scalars['String']['output'];
  province: Scalars['String']['output'];
};

export type OrderSender = {
  __typename?: 'OrderSender';
  address: OrderSenderAddress;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type OrderSenderAddress = {
  __typename?: 'OrderSenderAddress';
  city: Scalars['String']['output'];
  coordinates: AddressCoordinates;
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  state: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export enum OrderStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  DroppedOff = 'DROPPED_OFF',
  Failed = 'FAILED',
  Pending = 'PENDING',
  PickedUp = 'PICKED_UP',
  Shipped = 'SHIPPED',
}

export type OrderVehicle = {
  __typename?: 'OrderVehicle';
  color: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  make: Scalars['String']['output'];
  model: Scalars['String']['output'];
  plate: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

export type OrdersInput = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<Pagination>;
  partnerId?: InputMaybe<Scalars['UUID']['input']>;
  serviceType?: InputMaybe<ServiceType>;
  sorting?: InputMaybe<Sorting>;
  status?: InputMaybe<OrderStatus>;
};

export type OrdersOutput = {
  __typename?: 'OrdersOutput';
  orders: Array<Order>;
  total: Scalars['Int']['output'];
};

export type Pagination = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type Partner = {
  __typename?: 'Partner';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PartnerInput = {
  id: Scalars['UUID']['input'];
};

export type PartnerOutput = {
  __typename?: 'PartnerOutput';
  partner: Partner;
};

export type PartnerUser = IUser & {
  __typename?: 'PartnerUser';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isEnabled: Scalars['Boolean']['output'];
  isPhoneVerified: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  partner: UserPartner;
  phone: Scalars['String']['output'];
  type: UserType;
};

export type PartnersInput = {
  _?: InputMaybe<Scalars['String']['input']>;
};

export type PartnersOutput = {
  __typename?: 'PartnersOutput';
  partners: Array<Partner>;
};

export enum PaymentMethodType {
  Card = 'CARD',
  PartnerBalance = 'PARTNER_BALANCE',
}

export type PricingRule = ArticlePricingRule;

export type PricingRuleArticle = {
  __typename?: 'PricingRuleArticle';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PricingRuleArticleVariant = {
  __typename?: 'PricingRuleArticleVariant';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PricingRuleContentType = {
  __typename?: 'PricingRuleContentType';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PricingRuleDeliveryType = {
  __typename?: 'PricingRuleDeliveryType';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PricingRuleInput = {
  id: Scalars['UUID']['input'];
};

export type PricingRuleLocation = {
  __typename?: 'PricingRuleLocation';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PricingRuleOutput = {
  __typename?: 'PricingRuleOutput';
  pricingRule: PricingRule;
};

export type PricingRulePartner = {
  __typename?: 'PricingRulePartner';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export enum PricingRuleType {
  Article = 'ARTICLE',
  Package = 'PACKAGE',
}

export type PricingRulesInput = {
  articleId?: InputMaybe<Scalars['UUID']['input']>;
  articleVariantId?: InputMaybe<Scalars['UUID']['input']>;
  contentTypeId?: InputMaybe<Scalars['UUID']['input']>;
  deliveryTypeId?: InputMaybe<Scalars['UUID']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  locationId?: InputMaybe<Scalars['UUID']['input']>;
  partnerId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<PricingRuleType>;
};

export type PricingRulesOutput = {
  __typename?: 'PricingRulesOutput';
  pricingRules: Array<PricingRule>;
};

export type Province = {
  __typename?: 'Province';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type ProvinceInput = {
  id: Scalars['UUID']['input'];
};

export type ProvinceOutput = {
  __typename?: 'ProvinceOutput';
  province: Province;
};

export type ProvincesInput = {
  countryId: Scalars['UUID']['input'];
};

export type ProvincesOutput = {
  __typename?: 'ProvincesOutput';
  provinces: Array<Province>;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['String']['output']>;
  article: ArticleOutput;
  articles: ArticlesOutput;
  cities: CitiesOutput;
  city: CityOutput;
  clientUser: ClientUserOutput;
  clientUsers: ClientUsersOutput;
  countries: CountriesOutput;
  country: CountryOutput;
  currentUser: CurrentUserOutput;
  deliveryType: DeliveryTypeOutput;
  deliveryTypes: DeliveryTypesOutput;
  driverUser: DriverUserOutput;
  driverUsers: DriverUsersOutput;
  municipalities: MunicipalitiesOutput;
  municipality: MunicipalityOutput;
  neighborhood: NeighborhoodOutput;
  neighborhoods: NeighborhoodsOutput;
  order: OrderOutput;
  orders: OrdersOutput;
  partner: PartnerOutput;
  partners: PartnersOutput;
  pricingRule: PricingRuleOutput;
  pricingRules: PricingRulesOutput;
  province: ProvinceOutput;
  provinces: ProvincesOutput;
  staffUser: StaffUserOutput;
  staffUsers: StaffUsersOutput;
  state: StateOutput;
  states: StatesOutput;
};

export type QueryArticleArgs = {
  input: ArticleInput;
};

export type QueryArticlesArgs = {
  input: ArticlesInput;
};

export type QueryCitiesArgs = {
  input: CitiesInput;
};

export type QueryCityArgs = {
  input: CityInput;
};

export type QueryClientUserArgs = {
  input: ClientUserInput;
};

export type QueryClientUsersArgs = {
  input: ClientUsersInput;
};

export type QueryCountriesArgs = {
  input: CountriesInput;
};

export type QueryCountryArgs = {
  input: CountryInput;
};

export type QueryCurrentUserArgs = {
  input: CurrentUserInput;
};

export type QueryDeliveryTypeArgs = {
  input: DeliveryTypeInput;
};

export type QueryDeliveryTypesArgs = {
  input: DeliveryTypesInput;
};

export type QueryDriverUserArgs = {
  input: DriverUserInput;
};

export type QueryDriverUsersArgs = {
  input: DriverUsersInput;
};

export type QueryMunicipalitiesArgs = {
  input: MunicipalitiesInput;
};

export type QueryMunicipalityArgs = {
  input: MunicipalityInput;
};

export type QueryNeighborhoodArgs = {
  input: NeighborhoodInput;
};

export type QueryNeighborhoodsArgs = {
  input: NeighborhoodsInput;
};

export type QueryOrderArgs = {
  input: OrderInput;
};

export type QueryOrdersArgs = {
  input: OrdersInput;
};

export type QueryPartnerArgs = {
  input: PartnerInput;
};

export type QueryPartnersArgs = {
  input: PartnersInput;
};

export type QueryPricingRuleArgs = {
  input: PricingRuleInput;
};

export type QueryPricingRulesArgs = {
  input: PricingRulesInput;
};

export type QueryProvinceArgs = {
  input: ProvinceInput;
};

export type QueryProvincesArgs = {
  input: ProvincesInput;
};

export type QueryStaffUserArgs = {
  input: StaffUserInput;
};

export type QueryStaffUsersArgs = {
  input: StaffUsersInput;
};

export type QueryStateArgs = {
  input: StateInput;
};

export type QueryStatesArgs = {
  input: StatesInput;
};

export type RefreshTokensInput = {
  _?: InputMaybe<Scalars['String']['input']>;
};

export type RefreshTokensOutput = {
  __typename?: 'RefreshTokensOutput';
  tokens: Tokens;
};

export type SendEmailVerificationInput = {
  email: Scalars['String']['input'];
};

export type SendEmailVerificationOutput = {
  __typename?: 'SendEmailVerificationOutput';
  _?: Maybe<Scalars['String']['output']>;
};

export type SendPhoneVerificationInput = {
  phone: Scalars['String']['input'];
};

export type SendPhoneVerificationOutput = {
  __typename?: 'SendPhoneVerificationOutput';
  _?: Maybe<Scalars['String']['output']>;
};

export enum ServiceType {
  Delivery = 'DELIVERY',
  Wrapping = 'WRAPPING',
}

export type SignInInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type SignInOutput = {
  __typename?: 'SignInOutput';
  tokens: Tokens;
};

export type SignOutInput = {
  _?: InputMaybe<Scalars['String']['input']>;
};

export type SignOutOutput = {
  __typename?: 'SignOutOutput';
  _?: Maybe<Scalars['String']['output']>;
};

export type Sorting = {
  field: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type StaffUser = IUser & {
  __typename?: 'StaffUser';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isEnabled: Scalars['Boolean']['output'];
  isPhoneVerified: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  partner: UserPartner;
  phone: Scalars['String']['output'];
  type: UserType;
};

export type StaffUserInput = {
  id: Scalars['UUID']['input'];
};

export type StaffUserOutput = {
  __typename?: 'StaffUserOutput';
  staffUser: StaffUser;
};

export type StaffUsersInput = {
  pagination?: InputMaybe<Pagination>;
  partnerId?: InputMaybe<Scalars['UUID']['input']>;
  sorting?: InputMaybe<Sorting>;
};

export type StaffUsersOutput = {
  __typename?: 'StaffUsersOutput';
  staffUsers: Array<StaffUser>;
  total: Scalars['Int']['output'];
};

export type State = {
  __typename?: 'State';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type StateInput = {
  id: Scalars['UUID']['input'];
};

export type StateOutput = {
  __typename?: 'StateOutput';
  state: State;
};

export type StatesInput = {
  countryId: Scalars['UUID']['input'];
};

export type StatesOutput = {
  __typename?: 'StatesOutput';
  states: Array<State>;
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type UpdateArticleInput = {
  description: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  imagePath: Scalars['String']['input'];
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type UpdateArticleOutput = {
  __typename?: 'UpdateArticleOutput';
  article: Article;
};

export type UpdateArticlePricingRuleInput = {
  articleId: Scalars['UUID']['input'];
  articleVariantId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
  isEnabled: Scalars['Boolean']['input'];
  locationId: Scalars['UUID']['input'];
  partnerId: Scalars['UUID']['input'];
  price: Scalars['Int']['input'];
};

export type UpdateArticlePricingRuleOutput = {
  __typename?: 'UpdateArticlePricingRuleOutput';
  articlePricingRule: ArticlePricingRule;
};

export type UpdateArticleVariantInput = {
  id: Scalars['UUID']['input'];
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type UpdateArticleVariantOutput = {
  __typename?: 'UpdateArticleVariantOutput';
  articleVariant: ArticleVariant;
};

export type UpdateCityInput = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  stateId: Scalars['UUID']['input'];
  zipCodes: Array<Scalars['String']['input']>;
};

export type UpdateCityOutput = {
  __typename?: 'UpdateCityOutput';
  city: City;
};

export type UpdateDeliveryTypeInput = {
  description: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type UpdateDeliveryTypeOutput = {
  __typename?: 'UpdateDeliveryTypeOutput';
  deliveryType: DeliveryType;
};

export type UpdateDriverUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type UpdateDriverUserOutput = {
  __typename?: 'UpdateDriverUserOutput';
  driverUser: DriverUser;
};

export type UpdateMunicipalityInput = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  provinceId: Scalars['UUID']['input'];
};

export type UpdateMunicipalityOutput = {
  __typename?: 'UpdateMunicipalityOutput';
  municipality: Municipality;
};

export type UpdateNeighborhoodInput = {
  id: Scalars['UUID']['input'];
  municipalityId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateNeighborhoodOutput = {
  __typename?: 'UpdateNeighborhoodOutput';
  neighborhood: Neighborhood;
};

export type UpdatePartnerInput = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type UpdatePartnerOutput = {
  __typename?: 'UpdatePartnerOutput';
  partner: Partner;
};

export type UpdatePartnerUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type UpdatePartnerUserOutput = {
  __typename?: 'UpdatePartnerUserOutput';
  partnerUser: PartnerUser;
};

export type UpdateProvinceInput = {
  countryId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateProvinceOutput = {
  __typename?: 'UpdateProvinceOutput';
  province: Province;
};

export type UpdateStaffUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type UpdateStaffUserOutput = {
  __typename?: 'UpdateStaffUserOutput';
  staffUser: StaffUser;
};

export type UpdateStateInput = {
  countryId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateStateOutput = {
  __typename?: 'UpdateStateOutput';
  state: State;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type UserPartner = {
  __typename?: 'UserPartner';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export enum UserType {
  Client = 'CLIENT',
  Driver = 'DRIVER',
  Partner = 'PARTNER',
  Staff = 'STAFF',
}

export type VerifyEmailInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type VerifyEmailOutput = {
  __typename?: 'VerifyEmailOutput';
  tokens: Tokens;
};

export type VerifyPhoneInput = {
  code: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type VerifyPhoneOutput = {
  __typename?: 'VerifyPhoneOutput';
  tokens: Tokens;
};

export type WrappingOrder = Order & {
  __typename?: 'WrappingOrder';
  addons: Array<OrderAddon>;
  client: OrderClient;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  discount: Scalars['Int']['output'];
  driver?: Maybe<OrderDriver>;
  externalId?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  items: Array<OrderItem>;
  partner: OrderPartner;
  paymentMethod: OrderPaymentMethod;
  sender: OrderSender;
  serviceType: ServiceType;
  status: OrderStatus;
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  vat: Scalars['Int']['output'];
};

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  signIn: {
    __typename?: 'SignInOutput';
    tokens: {
      __typename?: 'Tokens';
      accessToken: string;
      refreshToken: string;
    };
  };
};

export type SignOutMutationVariables = Exact<{
  input: SignOutInput;
}>;

export type SignOutMutation = {
  __typename?: 'Mutation';
  signOut: { __typename?: 'SignOutOutput'; _?: string | null };
};

export type RefreshTokensMutationVariables = Exact<{
  input: RefreshTokensInput;
}>;

export type RefreshTokensMutation = {
  __typename?: 'Mutation';
  refreshTokens: {
    __typename?: 'RefreshTokensOutput';
    tokens: {
      __typename?: 'Tokens';
      accessToken: string;
      refreshToken: string;
    };
  };
};

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;

export type VerifyEmailMutation = {
  __typename?: 'Mutation';
  verifyEmail: {
    __typename?: 'VerifyEmailOutput';
    tokens: {
      __typename?: 'Tokens';
      accessToken: string;
      refreshToken: string;
    };
  };
};

export type VerifyPhoneMutationVariables = Exact<{
  input: VerifyPhoneInput;
}>;

export type VerifyPhoneMutation = {
  __typename?: 'Mutation';
  verifyPhone: {
    __typename?: 'VerifyPhoneOutput';
    tokens: {
      __typename?: 'Tokens';
      accessToken: string;
      refreshToken: string;
    };
  };
};

export type SendEmailVerificationMutationVariables = Exact<{
  input: SendEmailVerificationInput;
}>;

export type SendEmailVerificationMutation = {
  __typename?: 'Mutation';
  sendEmailVerification: {
    __typename?: 'SendEmailVerificationOutput';
    _?: string | null;
  };
};

export type SendPhoneVerificationMutationVariables = Exact<{
  input: SendPhoneVerificationInput;
}>;

export type SendPhoneVerificationMutation = {
  __typename?: 'Mutation';
  sendPhoneVerification: {
    __typename?: 'SendPhoneVerificationOutput';
    _?: string | null;
  };
};

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: 'Mutation';
  changePassword: { __typename?: 'ChangePasswordOutput'; _?: string | null };
};

export type EnableUserMutationVariables = Exact<{
  input: EnableUserInput;
}>;

export type EnableUserMutation = {
  __typename?: 'Mutation';
  enableUser: { __typename?: 'EnableUserOutput'; _?: string | null };
};

export type DisableUserMutationVariables = Exact<{
  input: DisableUserInput;
}>;

export type DisableUserMutation = {
  __typename?: 'Mutation';
  disableUser: { __typename?: 'DisableUserOutput'; _?: string | null };
};

export type CreateDriverUserMutationVariables = Exact<{
  input: CreateDriverUserInput;
}>;

export type CreateDriverUserMutation = {
  __typename?: 'Mutation';
  createDriverUser: {
    __typename?: 'CreateDriverUserOutput';
    driverUser: {
      __typename?: 'DriverUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    };
  };
};

export type CreatePartnerUserMutationVariables = Exact<{
  input: CreatePartnerUserInput;
}>;

export type CreatePartnerUserMutation = {
  __typename?: 'Mutation';
  createPartnerUser: {
    __typename?: 'CreatePartnerUserOutput';
    partnerUser: {
      __typename?: 'PartnerUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    };
  };
};

export type CreateStaffUserMutationVariables = Exact<{
  input: CreateStaffUserInput;
}>;

export type CreateStaffUserMutation = {
  __typename?: 'Mutation';
  createStaffUser: {
    __typename?: 'CreateStaffUserOutput';
    staffUser: {
      __typename?: 'StaffUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    };
  };
};

export type UpdateDriverUserMutationVariables = Exact<{
  input: UpdateDriverUserInput;
}>;

export type UpdateDriverUserMutation = {
  __typename?: 'Mutation';
  updateDriverUser: {
    __typename?: 'UpdateDriverUserOutput';
    driverUser: {
      __typename?: 'DriverUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    };
  };
};

export type UpdatePartnerUserMutationVariables = Exact<{
  input: UpdatePartnerUserInput;
}>;

export type UpdatePartnerUserMutation = {
  __typename?: 'Mutation';
  updatePartnerUser: {
    __typename?: 'UpdatePartnerUserOutput';
    partnerUser: {
      __typename?: 'PartnerUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    };
  };
};

export type UpdateStaffUserMutationVariables = Exact<{
  input: UpdateStaffUserInput;
}>;

export type UpdateStaffUserMutation = {
  __typename?: 'Mutation';
  updateStaffUser: {
    __typename?: 'UpdateStaffUserOutput';
    staffUser: {
      __typename?: 'StaffUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    };
  };
};

export type DropOffOrderMutationVariables = Exact<{
  input: DropOffOrderInput;
}>;

export type DropOffOrderMutation = {
  __typename?: 'Mutation';
  dropOffOrder: { __typename?: 'DropOffOrderOutput'; _?: string | null };
};

export type CreateArticleMutationVariables = Exact<{
  input: CreateArticleInput;
}>;

export type CreateArticleMutation = {
  __typename?: 'Mutation';
  createArticle: {
    __typename?: 'CreateArticleOutput';
    article: {
      __typename?: 'Article';
      id: any;
      name: string;
      description: string;
      imagePath: string;
      isEnabled: boolean;
      variants: Array<{
        __typename?: 'ArticleVariant';
        id: any;
        name: string;
        isEnabled: boolean;
      }>;
    };
  };
};

export type UpdateArticleMutationVariables = Exact<{
  input: UpdateArticleInput;
}>;

export type UpdateArticleMutation = {
  __typename?: 'Mutation';
  updateArticle: {
    __typename?: 'UpdateArticleOutput';
    article: {
      __typename?: 'Article';
      id: any;
      name: string;
      description: string;
      imagePath: string;
      isEnabled: boolean;
      variants: Array<{
        __typename?: 'ArticleVariant';
        id: any;
        name: string;
        isEnabled: boolean;
      }>;
    };
  };
};

export type CreateArticleVariantMutationVariables = Exact<{
  input: CreateArticleVariantInput;
}>;

export type CreateArticleVariantMutation = {
  __typename?: 'Mutation';
  createArticleVariant: {
    __typename?: 'CreateArticleVariantOutput';
    articleVariant: {
      __typename?: 'ArticleVariant';
      id: any;
      name: string;
      isEnabled: boolean;
    };
  };
};

export type UpdateArticleVariantMutationVariables = Exact<{
  input: UpdateArticleVariantInput;
}>;

export type UpdateArticleVariantMutation = {
  __typename?: 'Mutation';
  updateArticleVariant: {
    __typename?: 'UpdateArticleVariantOutput';
    articleVariant: {
      __typename?: 'ArticleVariant';
      id: any;
      name: string;
      isEnabled: boolean;
    };
  };
};

export type CreateDeliveryTypeMutationVariables = Exact<{
  input: CreateDeliveryTypeInput;
}>;

export type CreateDeliveryTypeMutation = {
  __typename?: 'Mutation';
  createDeliveryType: {
    __typename?: 'CreateDeliveryTypeOutput';
    deliveryType: {
      __typename?: 'DeliveryType';
      id: any;
      name: string;
      icon: string;
      description: string;
      isEnabled: boolean;
    };
  };
};

export type UpdateDeliveryTypeMutationVariables = Exact<{
  input: UpdateDeliveryTypeInput;
}>;

export type UpdateDeliveryTypeMutation = {
  __typename?: 'Mutation';
  updateDeliveryType: {
    __typename?: 'UpdateDeliveryTypeOutput';
    deliveryType: {
      __typename?: 'DeliveryType';
      id: any;
      name: string;
      icon: string;
      description: string;
      isEnabled: boolean;
    };
  };
};

export type CreateArticlePricingRuleMutationVariables = Exact<{
  input: CreateArticlePricingRuleInput;
}>;

export type CreateArticlePricingRuleMutation = {
  __typename?: 'Mutation';
  createArticlePricingRule: {
    __typename?: 'CreateArticlePricingRuleOutput';
    articlePricingRule: {
      __typename?: 'ArticlePricingRule';
      id: any;
      type: PricingRuleType;
      isEnabled: boolean;
      price: number;
      partner: { __typename?: 'PricingRulePartner'; id: any; name: string };
      location: { __typename?: 'PricingRuleLocation'; id: any; name: string };
      deliveryType: {
        __typename?: 'PricingRuleDeliveryType';
        id: any;
        name: string;
      };
      article: { __typename?: 'PricingRuleArticle'; id: any; name: string };
      articleVariant: {
        __typename?: 'PricingRuleArticleVariant';
        id: any;
        name: string;
      };
    };
  };
};

export type UpdateArticlePricingRuleMutationVariables = Exact<{
  input: UpdateArticlePricingRuleInput;
}>;

export type UpdateArticlePricingRuleMutation = {
  __typename?: 'Mutation';
  updateArticlePricingRule: {
    __typename?: 'UpdateArticlePricingRuleOutput';
    articlePricingRule: {
      __typename?: 'ArticlePricingRule';
      id: any;
      type: PricingRuleType;
      isEnabled: boolean;
      price: number;
      partner: { __typename?: 'PricingRulePartner'; id: any; name: string };
      location: { __typename?: 'PricingRuleLocation'; id: any; name: string };
      deliveryType: {
        __typename?: 'PricingRuleDeliveryType';
        id: any;
        name: string;
      };
      article: { __typename?: 'PricingRuleArticle'; id: any; name: string };
      articleVariant: {
        __typename?: 'PricingRuleArticleVariant';
        id: any;
        name: string;
      };
    };
  };
};

export type CreateStateMutationVariables = Exact<{
  input: CreateStateInput;
}>;

export type CreateStateMutation = {
  __typename?: 'Mutation';
  createState: {
    __typename?: 'CreateStateOutput';
    state: { __typename?: 'State'; id: any; name: string };
  };
};

export type UpdateStateMutationVariables = Exact<{
  input: UpdateStateInput;
}>;

export type UpdateStateMutation = {
  __typename?: 'Mutation';
  updateState: {
    __typename?: 'UpdateStateOutput';
    state: { __typename?: 'State'; id: any; name: string };
  };
};

export type CreateCityMutationVariables = Exact<{
  input: CreateCityInput;
}>;

export type CreateCityMutation = {
  __typename?: 'Mutation';
  createCity: {
    __typename?: 'CreateCityOutput';
    city: {
      __typename?: 'City';
      id: any;
      name: string;
      zipCodes: Array<string>;
    };
  };
};

export type UpdateCityMutationVariables = Exact<{
  input: UpdateCityInput;
}>;

export type UpdateCityMutation = {
  __typename?: 'Mutation';
  updateCity: {
    __typename?: 'UpdateCityOutput';
    city: {
      __typename?: 'City';
      id: any;
      name: string;
      zipCodes: Array<string>;
    };
  };
};

export type CreateProvinceMutationVariables = Exact<{
  input: CreateProvinceInput;
}>;

export type CreateProvinceMutation = {
  __typename?: 'Mutation';
  createProvince: {
    __typename?: 'CreateProvinceOutput';
    province: { __typename?: 'Province'; id: any; name: string };
  };
};

export type UpdateProvinceMutationVariables = Exact<{
  input: UpdateProvinceInput;
}>;

export type UpdateProvinceMutation = {
  __typename?: 'Mutation';
  updateProvince: {
    __typename?: 'UpdateProvinceOutput';
    province: { __typename?: 'Province'; id: any; name: string };
  };
};

export type CreateMunicipalityMutationVariables = Exact<{
  input: CreateMunicipalityInput;
}>;

export type CreateMunicipalityMutation = {
  __typename?: 'Mutation';
  createMunicipality: {
    __typename?: 'CreateMunicipalityOutput';
    municipality: { __typename?: 'Municipality'; id: any; name: string };
  };
};

export type UpdateMunicipalityMutationVariables = Exact<{
  input: UpdateMunicipalityInput;
}>;

export type UpdateMunicipalityMutation = {
  __typename?: 'Mutation';
  updateMunicipality: {
    __typename?: 'UpdateMunicipalityOutput';
    municipality: { __typename?: 'Municipality'; id: any; name: string };
  };
};

export type CreateNeighborhoodMutationVariables = Exact<{
  input: CreateNeighborhoodInput;
}>;

export type CreateNeighborhoodMutation = {
  __typename?: 'Mutation';
  createNeighborhood: {
    __typename?: 'CreateNeighborhoodOutput';
    neighborhood: { __typename?: 'Neighborhood'; id: any; name: string };
  };
};

export type UpdateNeighborhoodMutationVariables = Exact<{
  input: UpdateNeighborhoodInput;
}>;

export type UpdateNeighborhoodMutation = {
  __typename?: 'Mutation';
  updateNeighborhood: {
    __typename?: 'UpdateNeighborhoodOutput';
    neighborhood: { __typename?: 'Neighborhood'; id: any; name: string };
  };
};

export type CreatePresignPutFileUrlMutationVariables = Exact<{
  input: CreatePresignPutFileUrlInput;
}>;

export type CreatePresignPutFileUrlMutation = {
  __typename?: 'Mutation';
  createPresignPutFileUrl: {
    __typename?: 'CreatePresignPutFileUrlOutput';
    url: string;
    path: string;
  };
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: 'Query';
  currentUser: {
    __typename?: 'CurrentUserOutput';
    user: {
      __typename?: 'User';
      id: any;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      createdAt: any;
    };
  };
};

export type PartnersQueryVariables = Exact<{
  input: PartnersInput;
}>;

export type PartnersQuery = {
  __typename?: 'Query';
  partners: {
    __typename?: 'PartnersOutput';
    partners: Array<{ __typename?: 'Partner'; id: any; name: string }>;
  };
};

export type PartnerQueryVariables = Exact<{
  input: PartnerInput;
}>;

export type PartnerQuery = {
  __typename?: 'Query';
  partner: {
    __typename?: 'PartnerOutput';
    partner: { __typename?: 'Partner'; id: any; name: string };
  };
};

export type StaffUsersQueryVariables = Exact<{
  input: StaffUsersInput;
}>;

export type StaffUsersQuery = {
  __typename?: 'Query';
  staffUsers: {
    __typename?: 'StaffUsersOutput';
    total: number;
    staffUsers: Array<{
      __typename?: 'StaffUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    }>;
  };
};

export type StaffUserQueryVariables = Exact<{
  input: StaffUserInput;
}>;

export type StaffUserQuery = {
  __typename?: 'Query';
  staffUser: {
    __typename?: 'StaffUserOutput';
    staffUser: {
      __typename?: 'StaffUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    };
  };
};

export type ClientUsersQueryVariables = Exact<{
  input: ClientUsersInput;
}>;

export type ClientUsersQuery = {
  __typename?: 'Query';
  clientUsers: {
    __typename?: 'ClientUsersOutput';
    total: number;
    clientUsers: Array<{
      __typename?: 'ClientUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    }>;
  };
};

export type ClientUserQueryVariables = Exact<{
  input: ClientUserInput;
}>;

export type ClientUserQuery = {
  __typename?: 'Query';
  clientUser: {
    __typename?: 'ClientUserOutput';
    clientUser: {
      __typename?: 'ClientUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    };
  };
};

export type DriverUsersQueryVariables = Exact<{
  input: DriverUsersInput;
}>;

export type DriverUsersQuery = {
  __typename?: 'Query';
  driverUsers: {
    __typename?: 'DriverUsersOutput';
    total: number;
    driverUsers: Array<{
      __typename?: 'DriverUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    }>;
  };
};

export type DriverUserQueryVariables = Exact<{
  input: DriverUserInput;
}>;

export type DriverUserQuery = {
  __typename?: 'Query';
  driverUser: {
    __typename?: 'DriverUserOutput';
    driverUser: {
      __typename?: 'DriverUser';
      id: any;
      type: UserType;
      isEnabled: boolean;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      isPhoneVerified: boolean;
      createdAt: any;
      partner: { __typename?: 'UserPartner'; id: any; name: string };
    };
  };
};

export type OrdersQueryVariables = Exact<{
  input: OrdersInput;
}>;

export type OrdersQuery = {
  __typename?: 'Query';
  orders: {
    __typename?: 'OrdersOutput';
    total: number;
    orders: Array<
      | {
          __typename?: 'DeliveryOrder';
          id: any;
          code: string;
          externalId?: string | null;
          serviceType: ServiceType;
          status: OrderStatus;
          subtotal: number;
          discount: number;
          vat: number;
          total: number;
          createdAt: any;
          recipient: {
            __typename?: 'OrderRecipient';
            firstName: string;
            lastName: string;
            phone: string;
            email?: string | null;
            identityCardNumber: string;
            notes?: string | null;
            address: {
              __typename?: 'OrderRecipientAddress';
              line1: string;
              line2?: string | null;
              neighborhood?: string | null;
              municipality: string;
              province: string;
              postalCode: string;
              coordinates?: {
                __typename?: 'AddressCoordinates';
                latitude: number;
                longitude: number;
              } | null;
            };
          };
          client: {
            __typename?: 'OrderClient';
            id: any;
            firstName: string;
            lastName: string;
          };
          driver?: {
            __typename?: 'OrderDriver';
            id: any;
            firstName: string;
            lastName: string;
            vehicle: {
              __typename?: 'OrderVehicle';
              id: any;
              make: string;
              model: string;
              year: number;
              color: string;
              plate: string;
            };
          } | null;
          partner: { __typename?: 'OrderPartner'; id: any; name: string };
          sender: {
            __typename?: 'OrderSender';
            firstName: string;
            lastName: string;
            phone: string;
            email?: string | null;
            address: {
              __typename?: 'OrderSenderAddress';
              line1: string;
              line2?: string | null;
              city: string;
              state: string;
              zipCode: string;
              coordinates: {
                __typename?: 'AddressCoordinates';
                latitude: number;
                longitude: number;
              };
            };
          };
          paymentMethod:
            | {
                __typename?: 'OrderCard';
                id: any;
                type: PaymentMethodType;
                brand: string;
                last4: string;
                expMonth: number;
                expYear: number;
              }
            | {
                __typename?: 'OrderPartnerBalance';
                id: any;
                type: PaymentMethodType;
              };
          items: Array<{
            __typename?: 'OrderItem';
            id: any;
            quantity: number;
            total: number;
            product:
              | {
                  __typename?: 'OrderArticle';
                  id: any;
                  type: OrderProductType;
                  price: number;
                  name: string;
                  description: string;
                  imagePath: string;
                  variant: {
                    __typename?: 'OrderArticleVariant';
                    id: any;
                    name: string;
                  };
                  deliveryType: {
                    __typename?: 'OrderDeliveryType';
                    id: any;
                    name: string;
                  };
                }
              | {
                  __typename?: 'OrderLuggage';
                  type: OrderProductType;
                  price: number;
                  size: {
                    __typename?: 'OrderLuggageSize';
                    id: any;
                    price: number;
                  };
                };
          }>;
          addons: Array<
            | {
                __typename?: 'OrderHomePickupAddon';
                id: any;
                type: AddonType;
                total: number;
                price: number;
                freeThresholdAmount: number;
                date: any;
                hourRange: {
                  __typename?: 'OrderHomePickupAddonHourRange';
                  startAt: string;
                  endAt: string;
                };
              }
            | {
                __typename?: 'OrderHomeWrappingAddon';
                id: any;
                type: AddonType;
                total: number;
                price: number;
                freeThresholdAmount: number;
                date: any;
                hourRange: {
                  __typename?: 'OrderHomeWrappingAddonHourRange';
                  startAt: string;
                  endAt: string;
                };
              }
          >;
        }
      | {
          __typename?: 'WrappingOrder';
          id: any;
          code: string;
          externalId?: string | null;
          serviceType: ServiceType;
          status: OrderStatus;
          subtotal: number;
          discount: number;
          vat: number;
          total: number;
          createdAt: any;
          client: {
            __typename?: 'OrderClient';
            id: any;
            firstName: string;
            lastName: string;
          };
          driver?: {
            __typename?: 'OrderDriver';
            id: any;
            firstName: string;
            lastName: string;
            vehicle: {
              __typename?: 'OrderVehicle';
              id: any;
              make: string;
              model: string;
              year: number;
              color: string;
              plate: string;
            };
          } | null;
          partner: { __typename?: 'OrderPartner'; id: any; name: string };
          sender: {
            __typename?: 'OrderSender';
            firstName: string;
            lastName: string;
            phone: string;
            email?: string | null;
            address: {
              __typename?: 'OrderSenderAddress';
              line1: string;
              line2?: string | null;
              city: string;
              state: string;
              zipCode: string;
              coordinates: {
                __typename?: 'AddressCoordinates';
                latitude: number;
                longitude: number;
              };
            };
          };
          paymentMethod:
            | {
                __typename?: 'OrderCard';
                id: any;
                type: PaymentMethodType;
                brand: string;
                last4: string;
                expMonth: number;
                expYear: number;
              }
            | {
                __typename?: 'OrderPartnerBalance';
                id: any;
                type: PaymentMethodType;
              };
          items: Array<{
            __typename?: 'OrderItem';
            id: any;
            quantity: number;
            total: number;
            product:
              | {
                  __typename?: 'OrderArticle';
                  id: any;
                  type: OrderProductType;
                  price: number;
                  name: string;
                  description: string;
                  imagePath: string;
                  variant: {
                    __typename?: 'OrderArticleVariant';
                    id: any;
                    name: string;
                  };
                  deliveryType: {
                    __typename?: 'OrderDeliveryType';
                    id: any;
                    name: string;
                  };
                }
              | {
                  __typename?: 'OrderLuggage';
                  type: OrderProductType;
                  price: number;
                  size: {
                    __typename?: 'OrderLuggageSize';
                    id: any;
                    price: number;
                  };
                };
          }>;
          addons: Array<
            | {
                __typename?: 'OrderHomePickupAddon';
                id: any;
                type: AddonType;
                total: number;
                price: number;
                freeThresholdAmount: number;
                date: any;
                hourRange: {
                  __typename?: 'OrderHomePickupAddonHourRange';
                  startAt: string;
                  endAt: string;
                };
              }
            | {
                __typename?: 'OrderHomeWrappingAddon';
                id: any;
                type: AddonType;
                total: number;
                price: number;
                freeThresholdAmount: number;
                date: any;
                hourRange: {
                  __typename?: 'OrderHomeWrappingAddonHourRange';
                  startAt: string;
                  endAt: string;
                };
              }
          >;
        }
    >;
  };
};

export type OrderQueryVariables = Exact<{
  input: OrderInput;
}>;

export type OrderQuery = {
  __typename?: 'Query';
  order: {
    __typename?: 'OrderOutput';
    order:
      | {
          __typename?: 'DeliveryOrder';
          id: any;
          code: string;
          externalId?: string | null;
          serviceType: ServiceType;
          status: OrderStatus;
          subtotal: number;
          discount: number;
          vat: number;
          total: number;
          createdAt: any;
          recipient: {
            __typename?: 'OrderRecipient';
            firstName: string;
            lastName: string;
            phone: string;
            email?: string | null;
            identityCardNumber: string;
            notes?: string | null;
            address: {
              __typename?: 'OrderRecipientAddress';
              line1: string;
              line2?: string | null;
              neighborhood?: string | null;
              municipality: string;
              province: string;
              postalCode: string;
              coordinates?: {
                __typename?: 'AddressCoordinates';
                latitude: number;
                longitude: number;
              } | null;
            };
          };
          client: {
            __typename?: 'OrderClient';
            id: any;
            firstName: string;
            lastName: string;
          };
          driver?: {
            __typename?: 'OrderDriver';
            id: any;
            firstName: string;
            lastName: string;
            vehicle: {
              __typename?: 'OrderVehicle';
              id: any;
              make: string;
              model: string;
              year: number;
              color: string;
              plate: string;
            };
          } | null;
          partner: { __typename?: 'OrderPartner'; id: any; name: string };
          sender: {
            __typename?: 'OrderSender';
            firstName: string;
            lastName: string;
            phone: string;
            email?: string | null;
            address: {
              __typename?: 'OrderSenderAddress';
              line1: string;
              line2?: string | null;
              city: string;
              state: string;
              zipCode: string;
              coordinates: {
                __typename?: 'AddressCoordinates';
                latitude: number;
                longitude: number;
              };
            };
          };
          paymentMethod:
            | {
                __typename?: 'OrderCard';
                id: any;
                type: PaymentMethodType;
                brand: string;
                last4: string;
                expMonth: number;
                expYear: number;
              }
            | {
                __typename?: 'OrderPartnerBalance';
                id: any;
                type: PaymentMethodType;
              };
          items: Array<{
            __typename?: 'OrderItem';
            id: any;
            quantity: number;
            total: number;
            product:
              | {
                  __typename?: 'OrderArticle';
                  id: any;
                  type: OrderProductType;
                  price: number;
                  name: string;
                  description: string;
                  imagePath: string;
                  variant: {
                    __typename?: 'OrderArticleVariant';
                    id: any;
                    name: string;
                  };
                  deliveryType: {
                    __typename?: 'OrderDeliveryType';
                    id: any;
                    name: string;
                  };
                }
              | {
                  __typename?: 'OrderLuggage';
                  type: OrderProductType;
                  price: number;
                  size: {
                    __typename?: 'OrderLuggageSize';
                    id: any;
                    price: number;
                  };
                };
          }>;
          addons: Array<
            | {
                __typename?: 'OrderHomePickupAddon';
                id: any;
                type: AddonType;
                total: number;
                price: number;
                freeThresholdAmount: number;
                date: any;
                hourRange: {
                  __typename?: 'OrderHomePickupAddonHourRange';
                  startAt: string;
                  endAt: string;
                };
              }
            | {
                __typename?: 'OrderHomeWrappingAddon';
                id: any;
                type: AddonType;
                total: number;
                price: number;
                freeThresholdAmount: number;
                date: any;
                hourRange: {
                  __typename?: 'OrderHomeWrappingAddonHourRange';
                  startAt: string;
                  endAt: string;
                };
              }
          >;
        }
      | {
          __typename?: 'WrappingOrder';
          id: any;
          code: string;
          externalId?: string | null;
          serviceType: ServiceType;
          status: OrderStatus;
          subtotal: number;
          discount: number;
          vat: number;
          total: number;
          createdAt: any;
          client: {
            __typename?: 'OrderClient';
            id: any;
            firstName: string;
            lastName: string;
          };
          driver?: {
            __typename?: 'OrderDriver';
            id: any;
            firstName: string;
            lastName: string;
            vehicle: {
              __typename?: 'OrderVehicle';
              id: any;
              make: string;
              model: string;
              year: number;
              color: string;
              plate: string;
            };
          } | null;
          partner: { __typename?: 'OrderPartner'; id: any; name: string };
          sender: {
            __typename?: 'OrderSender';
            firstName: string;
            lastName: string;
            phone: string;
            email?: string | null;
            address: {
              __typename?: 'OrderSenderAddress';
              line1: string;
              line2?: string | null;
              city: string;
              state: string;
              zipCode: string;
              coordinates: {
                __typename?: 'AddressCoordinates';
                latitude: number;
                longitude: number;
              };
            };
          };
          paymentMethod:
            | {
                __typename?: 'OrderCard';
                id: any;
                type: PaymentMethodType;
                brand: string;
                last4: string;
                expMonth: number;
                expYear: number;
              }
            | {
                __typename?: 'OrderPartnerBalance';
                id: any;
                type: PaymentMethodType;
              };
          items: Array<{
            __typename?: 'OrderItem';
            id: any;
            quantity: number;
            total: number;
            product:
              | {
                  __typename?: 'OrderArticle';
                  id: any;
                  type: OrderProductType;
                  price: number;
                  name: string;
                  description: string;
                  imagePath: string;
                  variant: {
                    __typename?: 'OrderArticleVariant';
                    id: any;
                    name: string;
                  };
                  deliveryType: {
                    __typename?: 'OrderDeliveryType';
                    id: any;
                    name: string;
                  };
                }
              | {
                  __typename?: 'OrderLuggage';
                  type: OrderProductType;
                  price: number;
                  size: {
                    __typename?: 'OrderLuggageSize';
                    id: any;
                    price: number;
                  };
                };
          }>;
          addons: Array<
            | {
                __typename?: 'OrderHomePickupAddon';
                id: any;
                type: AddonType;
                total: number;
                price: number;
                freeThresholdAmount: number;
                date: any;
                hourRange: {
                  __typename?: 'OrderHomePickupAddonHourRange';
                  startAt: string;
                  endAt: string;
                };
              }
            | {
                __typename?: 'OrderHomeWrappingAddon';
                id: any;
                type: AddonType;
                total: number;
                price: number;
                freeThresholdAmount: number;
                date: any;
                hourRange: {
                  __typename?: 'OrderHomeWrappingAddonHourRange';
                  startAt: string;
                  endAt: string;
                };
              }
          >;
        };
  };
};

export type ArticlesQueryVariables = Exact<{
  input: ArticlesInput;
}>;

export type ArticlesQuery = {
  __typename?: 'Query';
  articles: {
    __typename?: 'ArticlesOutput';
    articles: Array<{
      __typename?: 'Article';
      id: any;
      name: string;
      description: string;
      imagePath: string;
      isEnabled: boolean;
      variants: Array<{
        __typename?: 'ArticleVariant';
        id: any;
        name: string;
        isEnabled: boolean;
      }>;
    }>;
  };
};

export type ArticleQueryVariables = Exact<{
  input: ArticleInput;
}>;

export type ArticleQuery = {
  __typename?: 'Query';
  article: {
    __typename?: 'ArticleOutput';
    article: {
      __typename?: 'Article';
      id: any;
      name: string;
      description: string;
      imagePath: string;
      isEnabled: boolean;
      variants: Array<{
        __typename?: 'ArticleVariant';
        id: any;
        name: string;
        isEnabled: boolean;
      }>;
    };
  };
};

export type DeliveryTypesQueryVariables = Exact<{
  input: DeliveryTypesInput;
}>;

export type DeliveryTypesQuery = {
  __typename?: 'Query';
  deliveryTypes: {
    __typename?: 'DeliveryTypesOutput';
    deliveryTypes: Array<{
      __typename?: 'DeliveryType';
      id: any;
      name: string;
      icon: string;
      description: string;
      isEnabled: boolean;
    }>;
  };
};

export type DeliveryTypeQueryVariables = Exact<{
  input: DeliveryTypeInput;
}>;

export type DeliveryTypeQuery = {
  __typename?: 'Query';
  deliveryType: {
    __typename?: 'DeliveryTypeOutput';
    deliveryType: {
      __typename?: 'DeliveryType';
      id: any;
      name: string;
      icon: string;
      description: string;
      isEnabled: boolean;
    };
  };
};

export type PricingRulesQueryVariables = Exact<{
  input: PricingRulesInput;
}>;

export type PricingRulesQuery = {
  __typename?: 'Query';
  pricingRules: {
    __typename?: 'PricingRulesOutput';
    pricingRules: Array<{
      __typename?: 'ArticlePricingRule';
      id: any;
      type: PricingRuleType;
      isEnabled: boolean;
      price: number;
      partner: { __typename?: 'PricingRulePartner'; id: any; name: string };
      location: { __typename?: 'PricingRuleLocation'; id: any; name: string };
      deliveryType: {
        __typename?: 'PricingRuleDeliveryType';
        id: any;
        name: string;
      };
      article: { __typename?: 'PricingRuleArticle'; id: any; name: string };
      articleVariant: {
        __typename?: 'PricingRuleArticleVariant';
        id: any;
        name: string;
      };
    }>;
  };
};

export type PricingRuleQueryVariables = Exact<{
  input: PricingRuleInput;
}>;

export type PricingRuleQuery = {
  __typename?: 'Query';
  pricingRule: {
    __typename?: 'PricingRuleOutput';
    pricingRule: {
      __typename?: 'ArticlePricingRule';
      id: any;
      type: PricingRuleType;
      isEnabled: boolean;
      price: number;
      partner: { __typename?: 'PricingRulePartner'; id: any; name: string };
      location: { __typename?: 'PricingRuleLocation'; id: any; name: string };
      deliveryType: {
        __typename?: 'PricingRuleDeliveryType';
        id: any;
        name: string;
      };
      article: { __typename?: 'PricingRuleArticle'; id: any; name: string };
      articleVariant: {
        __typename?: 'PricingRuleArticleVariant';
        id: any;
        name: string;
      };
    };
  };
};

export type CountriesQueryVariables = Exact<{
  input: CountriesInput;
}>;

export type CountriesQuery = {
  __typename?: 'Query';
  countries: {
    __typename?: 'CountriesOutput';
    countries: Array<{ __typename?: 'Country'; id: any; name: string }>;
  };
};

export type CountryQueryVariables = Exact<{
  input: CountryInput;
}>;

export type CountryQuery = {
  __typename?: 'Query';
  country: {
    __typename?: 'CountryOutput';
    country: { __typename?: 'Country'; id: any; name: string };
  };
};

export type StatesQueryVariables = Exact<{
  input: StatesInput;
}>;

export type StatesQuery = {
  __typename?: 'Query';
  states: {
    __typename?: 'StatesOutput';
    states: Array<{ __typename?: 'State'; id: any; name: string }>;
  };
};

export type StateQueryVariables = Exact<{
  input: StateInput;
}>;

export type StateQuery = {
  __typename?: 'Query';
  state: {
    __typename?: 'StateOutput';
    state: { __typename?: 'State'; id: any; name: string };
  };
};

export type CitiesQueryVariables = Exact<{
  input: CitiesInput;
}>;

export type CitiesQuery = {
  __typename?: 'Query';
  cities: {
    __typename?: 'CitiesOutput';
    cities: Array<{
      __typename?: 'City';
      id: any;
      name: string;
      zipCodes: Array<string>;
    }>;
  };
};

export type CityQueryVariables = Exact<{
  input: CityInput;
}>;

export type CityQuery = {
  __typename?: 'Query';
  city: {
    __typename?: 'CityOutput';
    city: {
      __typename?: 'City';
      id: any;
      name: string;
      zipCodes: Array<string>;
    };
  };
};

export type ProvincesQueryVariables = Exact<{
  input: ProvincesInput;
}>;

export type ProvincesQuery = {
  __typename?: 'Query';
  provinces: {
    __typename?: 'ProvincesOutput';
    provinces: Array<{ __typename?: 'Province'; id: any; name: string }>;
  };
};

export type ProvinceQueryVariables = Exact<{
  input: ProvinceInput;
}>;

export type ProvinceQuery = {
  __typename?: 'Query';
  province: {
    __typename?: 'ProvinceOutput';
    province: { __typename?: 'Province'; id: any; name: string };
  };
};

export type MunicipalitiesQueryVariables = Exact<{
  input: MunicipalitiesInput;
}>;

export type MunicipalitiesQuery = {
  __typename?: 'Query';
  municipalities: {
    __typename?: 'MunicipalitiesOutput';
    municipalities: Array<{
      __typename?: 'Municipality';
      id: any;
      name: string;
    }>;
  };
};

export type MunicipalityQueryVariables = Exact<{
  input: MunicipalityInput;
}>;

export type MunicipalityQuery = {
  __typename?: 'Query';
  municipality: {
    __typename?: 'MunicipalityOutput';
    municipality: { __typename?: 'Municipality'; id: any; name: string };
  };
};

export type NeighborhoodsQueryVariables = Exact<{
  input: NeighborhoodsInput;
}>;

export type NeighborhoodsQuery = {
  __typename?: 'Query';
  neighborhoods: {
    __typename?: 'NeighborhoodsOutput';
    neighborhoods: Array<{
      __typename?: 'Neighborhood';
      id: any;
      name: string;
    }>;
  };
};

export type NeighborhoodQueryVariables = Exact<{
  input: NeighborhoodInput;
}>;

export type NeighborhoodQuery = {
  __typename?: 'Query';
  neighborhood: {
    __typename?: 'NeighborhoodOutput';
    neighborhood: { __typename?: 'Neighborhood'; id: any; name: string };
  };
};

export const SignInDocument = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const SignOutDocument = gql`
  mutation SignOut($input: SignOutInput!) {
    signOut(input: $input) {
      _
    }
  }
`;
export type SignOutMutationFn = Apollo.MutationFunction<
  SignOutMutation,
  SignOutMutationVariables
>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignOutMutation,
    SignOutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(
    SignOutDocument,
    options
  );
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  SignOutMutation,
  SignOutMutationVariables
>;
export const RefreshTokensDocument = gql`
  mutation RefreshTokens($input: RefreshTokensInput!) {
    refreshTokens(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;
export type RefreshTokensMutationFn = Apollo.MutationFunction<
  RefreshTokensMutation,
  RefreshTokensMutationVariables
>;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokensMutation, { data, loading, error }] = useRefreshTokensMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokensMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshTokensMutation,
    RefreshTokensMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshTokensMutation,
    RefreshTokensMutationVariables
  >(RefreshTokensDocument, options);
}
export type RefreshTokensMutationHookResult = ReturnType<
  typeof useRefreshTokensMutation
>;
export type RefreshTokensMutationResult =
  Apollo.MutationResult<RefreshTokensMutation>;
export type RefreshTokensMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokensMutation,
  RefreshTokensMutationVariables
>;
export const VerifyEmailDocument = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;
export type VerifyEmailMutationFn = Apollo.MutationFunction<
  VerifyEmailMutation,
  VerifyEmailMutationVariables
>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(
    VerifyEmailDocument,
    options
  );
}
export type VerifyEmailMutationHookResult = ReturnType<
  typeof useVerifyEmailMutation
>;
export type VerifyEmailMutationResult =
  Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<
  VerifyEmailMutation,
  VerifyEmailMutationVariables
>;
export const VerifyPhoneDocument = gql`
  mutation VerifyPhone($input: VerifyPhoneInput!) {
    verifyPhone(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;
export type VerifyPhoneMutationFn = Apollo.MutationFunction<
  VerifyPhoneMutation,
  VerifyPhoneMutationVariables
>;

/**
 * __useVerifyPhoneMutation__
 *
 * To run a mutation, you first call `useVerifyPhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPhoneMutation, { data, loading, error }] = useVerifyPhoneMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyPhoneMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyPhoneMutation,
    VerifyPhoneMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VerifyPhoneMutation, VerifyPhoneMutationVariables>(
    VerifyPhoneDocument,
    options
  );
}
export type VerifyPhoneMutationHookResult = ReturnType<
  typeof useVerifyPhoneMutation
>;
export type VerifyPhoneMutationResult =
  Apollo.MutationResult<VerifyPhoneMutation>;
export type VerifyPhoneMutationOptions = Apollo.BaseMutationOptions<
  VerifyPhoneMutation,
  VerifyPhoneMutationVariables
>;
export const SendEmailVerificationDocument = gql`
  mutation SendEmailVerification($input: SendEmailVerificationInput!) {
    sendEmailVerification(input: $input) {
      _
    }
  }
`;
export type SendEmailVerificationMutationFn = Apollo.MutationFunction<
  SendEmailVerificationMutation,
  SendEmailVerificationMutationVariables
>;

/**
 * __useSendEmailVerificationMutation__
 *
 * To run a mutation, you first call `useSendEmailVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEmailVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEmailVerificationMutation, { data, loading, error }] = useSendEmailVerificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendEmailVerificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendEmailVerificationMutation,
    SendEmailVerificationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendEmailVerificationMutation,
    SendEmailVerificationMutationVariables
  >(SendEmailVerificationDocument, options);
}
export type SendEmailVerificationMutationHookResult = ReturnType<
  typeof useSendEmailVerificationMutation
>;
export type SendEmailVerificationMutationResult =
  Apollo.MutationResult<SendEmailVerificationMutation>;
export type SendEmailVerificationMutationOptions = Apollo.BaseMutationOptions<
  SendEmailVerificationMutation,
  SendEmailVerificationMutationVariables
>;
export const SendPhoneVerificationDocument = gql`
  mutation SendPhoneVerification($input: SendPhoneVerificationInput!) {
    sendPhoneVerification(input: $input) {
      _
    }
  }
`;
export type SendPhoneVerificationMutationFn = Apollo.MutationFunction<
  SendPhoneVerificationMutation,
  SendPhoneVerificationMutationVariables
>;

/**
 * __useSendPhoneVerificationMutation__
 *
 * To run a mutation, you first call `useSendPhoneVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPhoneVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPhoneVerificationMutation, { data, loading, error }] = useSendPhoneVerificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendPhoneVerificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendPhoneVerificationMutation,
    SendPhoneVerificationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendPhoneVerificationMutation,
    SendPhoneVerificationMutationVariables
  >(SendPhoneVerificationDocument, options);
}
export type SendPhoneVerificationMutationHookResult = ReturnType<
  typeof useSendPhoneVerificationMutation
>;
export type SendPhoneVerificationMutationResult =
  Apollo.MutationResult<SendPhoneVerificationMutation>;
export type SendPhoneVerificationMutationOptions = Apollo.BaseMutationOptions<
  SendPhoneVerificationMutation,
  SendPhoneVerificationMutationVariables
>;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      _
    }
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const EnableUserDocument = gql`
  mutation EnableUser($input: EnableUserInput!) {
    enableUser(input: $input) {
      _
    }
  }
`;
export type EnableUserMutationFn = Apollo.MutationFunction<
  EnableUserMutation,
  EnableUserMutationVariables
>;

/**
 * __useEnableUserMutation__
 *
 * To run a mutation, you first call `useEnableUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableUserMutation, { data, loading, error }] = useEnableUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEnableUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EnableUserMutation,
    EnableUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EnableUserMutation, EnableUserMutationVariables>(
    EnableUserDocument,
    options
  );
}
export type EnableUserMutationHookResult = ReturnType<
  typeof useEnableUserMutation
>;
export type EnableUserMutationResult =
  Apollo.MutationResult<EnableUserMutation>;
export type EnableUserMutationOptions = Apollo.BaseMutationOptions<
  EnableUserMutation,
  EnableUserMutationVariables
>;
export const DisableUserDocument = gql`
  mutation DisableUser($input: DisableUserInput!) {
    disableUser(input: $input) {
      _
    }
  }
`;
export type DisableUserMutationFn = Apollo.MutationFunction<
  DisableUserMutation,
  DisableUserMutationVariables
>;

/**
 * __useDisableUserMutation__
 *
 * To run a mutation, you first call `useDisableUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableUserMutation, { data, loading, error }] = useDisableUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDisableUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DisableUserMutation,
    DisableUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DisableUserMutation, DisableUserMutationVariables>(
    DisableUserDocument,
    options
  );
}
export type DisableUserMutationHookResult = ReturnType<
  typeof useDisableUserMutation
>;
export type DisableUserMutationResult =
  Apollo.MutationResult<DisableUserMutation>;
export type DisableUserMutationOptions = Apollo.BaseMutationOptions<
  DisableUserMutation,
  DisableUserMutationVariables
>;
export const CreateDriverUserDocument = gql`
  mutation CreateDriverUser($input: CreateDriverUserInput!) {
    createDriverUser(input: $input) {
      driverUser {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;
export type CreateDriverUserMutationFn = Apollo.MutationFunction<
  CreateDriverUserMutation,
  CreateDriverUserMutationVariables
>;

/**
 * __useCreateDriverUserMutation__
 *
 * To run a mutation, you first call `useCreateDriverUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDriverUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDriverUserMutation, { data, loading, error }] = useCreateDriverUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDriverUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDriverUserMutation,
    CreateDriverUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDriverUserMutation,
    CreateDriverUserMutationVariables
  >(CreateDriverUserDocument, options);
}
export type CreateDriverUserMutationHookResult = ReturnType<
  typeof useCreateDriverUserMutation
>;
export type CreateDriverUserMutationResult =
  Apollo.MutationResult<CreateDriverUserMutation>;
export type CreateDriverUserMutationOptions = Apollo.BaseMutationOptions<
  CreateDriverUserMutation,
  CreateDriverUserMutationVariables
>;
export const CreatePartnerUserDocument = gql`
  mutation CreatePartnerUser($input: CreatePartnerUserInput!) {
    createPartnerUser(input: $input) {
      partnerUser {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;
export type CreatePartnerUserMutationFn = Apollo.MutationFunction<
  CreatePartnerUserMutation,
  CreatePartnerUserMutationVariables
>;

/**
 * __useCreatePartnerUserMutation__
 *
 * To run a mutation, you first call `useCreatePartnerUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartnerUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartnerUserMutation, { data, loading, error }] = useCreatePartnerUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePartnerUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePartnerUserMutation,
    CreatePartnerUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePartnerUserMutation,
    CreatePartnerUserMutationVariables
  >(CreatePartnerUserDocument, options);
}
export type CreatePartnerUserMutationHookResult = ReturnType<
  typeof useCreatePartnerUserMutation
>;
export type CreatePartnerUserMutationResult =
  Apollo.MutationResult<CreatePartnerUserMutation>;
export type CreatePartnerUserMutationOptions = Apollo.BaseMutationOptions<
  CreatePartnerUserMutation,
  CreatePartnerUserMutationVariables
>;
export const CreateStaffUserDocument = gql`
  mutation CreateStaffUser($input: CreateStaffUserInput!) {
    createStaffUser(input: $input) {
      staffUser {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;
export type CreateStaffUserMutationFn = Apollo.MutationFunction<
  CreateStaffUserMutation,
  CreateStaffUserMutationVariables
>;

/**
 * __useCreateStaffUserMutation__
 *
 * To run a mutation, you first call `useCreateStaffUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStaffUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStaffUserMutation, { data, loading, error }] = useCreateStaffUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStaffUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateStaffUserMutation,
    CreateStaffUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateStaffUserMutation,
    CreateStaffUserMutationVariables
  >(CreateStaffUserDocument, options);
}
export type CreateStaffUserMutationHookResult = ReturnType<
  typeof useCreateStaffUserMutation
>;
export type CreateStaffUserMutationResult =
  Apollo.MutationResult<CreateStaffUserMutation>;
export type CreateStaffUserMutationOptions = Apollo.BaseMutationOptions<
  CreateStaffUserMutation,
  CreateStaffUserMutationVariables
>;
export const UpdateDriverUserDocument = gql`
  mutation UpdateDriverUser($input: UpdateDriverUserInput!) {
    updateDriverUser(input: $input) {
      driverUser {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;
export type UpdateDriverUserMutationFn = Apollo.MutationFunction<
  UpdateDriverUserMutation,
  UpdateDriverUserMutationVariables
>;

/**
 * __useUpdateDriverUserMutation__
 *
 * To run a mutation, you first call `useUpdateDriverUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDriverUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDriverUserMutation, { data, loading, error }] = useUpdateDriverUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDriverUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDriverUserMutation,
    UpdateDriverUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateDriverUserMutation,
    UpdateDriverUserMutationVariables
  >(UpdateDriverUserDocument, options);
}
export type UpdateDriverUserMutationHookResult = ReturnType<
  typeof useUpdateDriverUserMutation
>;
export type UpdateDriverUserMutationResult =
  Apollo.MutationResult<UpdateDriverUserMutation>;
export type UpdateDriverUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateDriverUserMutation,
  UpdateDriverUserMutationVariables
>;
export const UpdatePartnerUserDocument = gql`
  mutation UpdatePartnerUser($input: UpdatePartnerUserInput!) {
    updatePartnerUser(input: $input) {
      partnerUser {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;
export type UpdatePartnerUserMutationFn = Apollo.MutationFunction<
  UpdatePartnerUserMutation,
  UpdatePartnerUserMutationVariables
>;

/**
 * __useUpdatePartnerUserMutation__
 *
 * To run a mutation, you first call `useUpdatePartnerUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePartnerUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePartnerUserMutation, { data, loading, error }] = useUpdatePartnerUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePartnerUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePartnerUserMutation,
    UpdatePartnerUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdatePartnerUserMutation,
    UpdatePartnerUserMutationVariables
  >(UpdatePartnerUserDocument, options);
}
export type UpdatePartnerUserMutationHookResult = ReturnType<
  typeof useUpdatePartnerUserMutation
>;
export type UpdatePartnerUserMutationResult =
  Apollo.MutationResult<UpdatePartnerUserMutation>;
export type UpdatePartnerUserMutationOptions = Apollo.BaseMutationOptions<
  UpdatePartnerUserMutation,
  UpdatePartnerUserMutationVariables
>;
export const UpdateStaffUserDocument = gql`
  mutation UpdateStaffUser($input: UpdateStaffUserInput!) {
    updateStaffUser(input: $input) {
      staffUser {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;
export type UpdateStaffUserMutationFn = Apollo.MutationFunction<
  UpdateStaffUserMutation,
  UpdateStaffUserMutationVariables
>;

/**
 * __useUpdateStaffUserMutation__
 *
 * To run a mutation, you first call `useUpdateStaffUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStaffUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStaffUserMutation, { data, loading, error }] = useUpdateStaffUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStaffUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateStaffUserMutation,
    UpdateStaffUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateStaffUserMutation,
    UpdateStaffUserMutationVariables
  >(UpdateStaffUserDocument, options);
}
export type UpdateStaffUserMutationHookResult = ReturnType<
  typeof useUpdateStaffUserMutation
>;
export type UpdateStaffUserMutationResult =
  Apollo.MutationResult<UpdateStaffUserMutation>;
export type UpdateStaffUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateStaffUserMutation,
  UpdateStaffUserMutationVariables
>;
export const DropOffOrderDocument = gql`
  mutation DropOffOrder($input: DropOffOrderInput!) {
    dropOffOrder(input: $input) {
      _
    }
  }
`;
export type DropOffOrderMutationFn = Apollo.MutationFunction<
  DropOffOrderMutation,
  DropOffOrderMutationVariables
>;

/**
 * __useDropOffOrderMutation__
 *
 * To run a mutation, you first call `useDropOffOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDropOffOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dropOffOrderMutation, { data, loading, error }] = useDropOffOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDropOffOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DropOffOrderMutation,
    DropOffOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DropOffOrderMutation,
    DropOffOrderMutationVariables
  >(DropOffOrderDocument, options);
}
export type DropOffOrderMutationHookResult = ReturnType<
  typeof useDropOffOrderMutation
>;
export type DropOffOrderMutationResult =
  Apollo.MutationResult<DropOffOrderMutation>;
export type DropOffOrderMutationOptions = Apollo.BaseMutationOptions<
  DropOffOrderMutation,
  DropOffOrderMutationVariables
>;
export const CreateArticleDocument = gql`
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      article {
        id
        name
        description
        imagePath
        isEnabled
        variants {
          id
          name
          isEnabled
        }
      }
    }
  }
`;
export type CreateArticleMutationFn = Apollo.MutationFunction<
  CreateArticleMutation,
  CreateArticleMutationVariables
>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateArticleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateArticleMutation,
    CreateArticleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateArticleMutation,
    CreateArticleMutationVariables
  >(CreateArticleDocument, options);
}
export type CreateArticleMutationHookResult = ReturnType<
  typeof useCreateArticleMutation
>;
export type CreateArticleMutationResult =
  Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<
  CreateArticleMutation,
  CreateArticleMutationVariables
>;
export const UpdateArticleDocument = gql`
  mutation UpdateArticle($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      article {
        id
        name
        description
        imagePath
        isEnabled
        variants {
          id
          name
          isEnabled
        }
      }
    }
  }
`;
export type UpdateArticleMutationFn = Apollo.MutationFunction<
  UpdateArticleMutation,
  UpdateArticleMutationVariables
>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArticleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateArticleMutation,
    UpdateArticleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateArticleMutation,
    UpdateArticleMutationVariables
  >(UpdateArticleDocument, options);
}
export type UpdateArticleMutationHookResult = ReturnType<
  typeof useUpdateArticleMutation
>;
export type UpdateArticleMutationResult =
  Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<
  UpdateArticleMutation,
  UpdateArticleMutationVariables
>;
export const CreateArticleVariantDocument = gql`
  mutation CreateArticleVariant($input: CreateArticleVariantInput!) {
    createArticleVariant(input: $input) {
      articleVariant {
        id
        name
        isEnabled
      }
    }
  }
`;
export type CreateArticleVariantMutationFn = Apollo.MutationFunction<
  CreateArticleVariantMutation,
  CreateArticleVariantMutationVariables
>;

/**
 * __useCreateArticleVariantMutation__
 *
 * To run a mutation, you first call `useCreateArticleVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleVariantMutation, { data, loading, error }] = useCreateArticleVariantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateArticleVariantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateArticleVariantMutation,
    CreateArticleVariantMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateArticleVariantMutation,
    CreateArticleVariantMutationVariables
  >(CreateArticleVariantDocument, options);
}
export type CreateArticleVariantMutationHookResult = ReturnType<
  typeof useCreateArticleVariantMutation
>;
export type CreateArticleVariantMutationResult =
  Apollo.MutationResult<CreateArticleVariantMutation>;
export type CreateArticleVariantMutationOptions = Apollo.BaseMutationOptions<
  CreateArticleVariantMutation,
  CreateArticleVariantMutationVariables
>;
export const UpdateArticleVariantDocument = gql`
  mutation UpdateArticleVariant($input: UpdateArticleVariantInput!) {
    updateArticleVariant(input: $input) {
      articleVariant {
        id
        name
        isEnabled
      }
    }
  }
`;
export type UpdateArticleVariantMutationFn = Apollo.MutationFunction<
  UpdateArticleVariantMutation,
  UpdateArticleVariantMutationVariables
>;

/**
 * __useUpdateArticleVariantMutation__
 *
 * To run a mutation, you first call `useUpdateArticleVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleVariantMutation, { data, loading, error }] = useUpdateArticleVariantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArticleVariantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateArticleVariantMutation,
    UpdateArticleVariantMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateArticleVariantMutation,
    UpdateArticleVariantMutationVariables
  >(UpdateArticleVariantDocument, options);
}
export type UpdateArticleVariantMutationHookResult = ReturnType<
  typeof useUpdateArticleVariantMutation
>;
export type UpdateArticleVariantMutationResult =
  Apollo.MutationResult<UpdateArticleVariantMutation>;
export type UpdateArticleVariantMutationOptions = Apollo.BaseMutationOptions<
  UpdateArticleVariantMutation,
  UpdateArticleVariantMutationVariables
>;
export const CreateDeliveryTypeDocument = gql`
  mutation CreateDeliveryType($input: CreateDeliveryTypeInput!) {
    createDeliveryType(input: $input) {
      deliveryType {
        id
        name
        icon
        description
        isEnabled
      }
    }
  }
`;
export type CreateDeliveryTypeMutationFn = Apollo.MutationFunction<
  CreateDeliveryTypeMutation,
  CreateDeliveryTypeMutationVariables
>;

/**
 * __useCreateDeliveryTypeMutation__
 *
 * To run a mutation, you first call `useCreateDeliveryTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeliveryTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeliveryTypeMutation, { data, loading, error }] = useCreateDeliveryTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDeliveryTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDeliveryTypeMutation,
    CreateDeliveryTypeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDeliveryTypeMutation,
    CreateDeliveryTypeMutationVariables
  >(CreateDeliveryTypeDocument, options);
}
export type CreateDeliveryTypeMutationHookResult = ReturnType<
  typeof useCreateDeliveryTypeMutation
>;
export type CreateDeliveryTypeMutationResult =
  Apollo.MutationResult<CreateDeliveryTypeMutation>;
export type CreateDeliveryTypeMutationOptions = Apollo.BaseMutationOptions<
  CreateDeliveryTypeMutation,
  CreateDeliveryTypeMutationVariables
>;
export const UpdateDeliveryTypeDocument = gql`
  mutation UpdateDeliveryType($input: UpdateDeliveryTypeInput!) {
    updateDeliveryType(input: $input) {
      deliveryType {
        id
        name
        icon
        description
        isEnabled
      }
    }
  }
`;
export type UpdateDeliveryTypeMutationFn = Apollo.MutationFunction<
  UpdateDeliveryTypeMutation,
  UpdateDeliveryTypeMutationVariables
>;

/**
 * __useUpdateDeliveryTypeMutation__
 *
 * To run a mutation, you first call `useUpdateDeliveryTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeliveryTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeliveryTypeMutation, { data, loading, error }] = useUpdateDeliveryTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDeliveryTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDeliveryTypeMutation,
    UpdateDeliveryTypeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateDeliveryTypeMutation,
    UpdateDeliveryTypeMutationVariables
  >(UpdateDeliveryTypeDocument, options);
}
export type UpdateDeliveryTypeMutationHookResult = ReturnType<
  typeof useUpdateDeliveryTypeMutation
>;
export type UpdateDeliveryTypeMutationResult =
  Apollo.MutationResult<UpdateDeliveryTypeMutation>;
export type UpdateDeliveryTypeMutationOptions = Apollo.BaseMutationOptions<
  UpdateDeliveryTypeMutation,
  UpdateDeliveryTypeMutationVariables
>;
export const CreateArticlePricingRuleDocument = gql`
  mutation CreateArticlePricingRule($input: CreateArticlePricingRuleInput!) {
    createArticlePricingRule(input: $input) {
      articlePricingRule {
        id
        type
        isEnabled
        price
        partner {
          id
          name
        }
        location {
          id
          name
        }
        deliveryType {
          id
          name
        }
        article {
          id
          name
        }
        articleVariant {
          id
          name
        }
      }
    }
  }
`;
export type CreateArticlePricingRuleMutationFn = Apollo.MutationFunction<
  CreateArticlePricingRuleMutation,
  CreateArticlePricingRuleMutationVariables
>;

/**
 * __useCreateArticlePricingRuleMutation__
 *
 * To run a mutation, you first call `useCreateArticlePricingRuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticlePricingRuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticlePricingRuleMutation, { data, loading, error }] = useCreateArticlePricingRuleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateArticlePricingRuleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateArticlePricingRuleMutation,
    CreateArticlePricingRuleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateArticlePricingRuleMutation,
    CreateArticlePricingRuleMutationVariables
  >(CreateArticlePricingRuleDocument, options);
}
export type CreateArticlePricingRuleMutationHookResult = ReturnType<
  typeof useCreateArticlePricingRuleMutation
>;
export type CreateArticlePricingRuleMutationResult =
  Apollo.MutationResult<CreateArticlePricingRuleMutation>;
export type CreateArticlePricingRuleMutationOptions =
  Apollo.BaseMutationOptions<
    CreateArticlePricingRuleMutation,
    CreateArticlePricingRuleMutationVariables
  >;
export const UpdateArticlePricingRuleDocument = gql`
  mutation UpdateArticlePricingRule($input: UpdateArticlePricingRuleInput!) {
    updateArticlePricingRule(input: $input) {
      articlePricingRule {
        id
        type
        isEnabled
        price
        partner {
          id
          name
        }
        location {
          id
          name
        }
        deliveryType {
          id
          name
        }
        article {
          id
          name
        }
        articleVariant {
          id
          name
        }
      }
    }
  }
`;
export type UpdateArticlePricingRuleMutationFn = Apollo.MutationFunction<
  UpdateArticlePricingRuleMutation,
  UpdateArticlePricingRuleMutationVariables
>;

/**
 * __useUpdateArticlePricingRuleMutation__
 *
 * To run a mutation, you first call `useUpdateArticlePricingRuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticlePricingRuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticlePricingRuleMutation, { data, loading, error }] = useUpdateArticlePricingRuleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArticlePricingRuleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateArticlePricingRuleMutation,
    UpdateArticlePricingRuleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateArticlePricingRuleMutation,
    UpdateArticlePricingRuleMutationVariables
  >(UpdateArticlePricingRuleDocument, options);
}
export type UpdateArticlePricingRuleMutationHookResult = ReturnType<
  typeof useUpdateArticlePricingRuleMutation
>;
export type UpdateArticlePricingRuleMutationResult =
  Apollo.MutationResult<UpdateArticlePricingRuleMutation>;
export type UpdateArticlePricingRuleMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateArticlePricingRuleMutation,
    UpdateArticlePricingRuleMutationVariables
  >;
export const CreateStateDocument = gql`
  mutation CreateState($input: CreateStateInput!) {
    createState(input: $input) {
      state {
        id
        name
      }
    }
  }
`;
export type CreateStateMutationFn = Apollo.MutationFunction<
  CreateStateMutation,
  CreateStateMutationVariables
>;

/**
 * __useCreateStateMutation__
 *
 * To run a mutation, you first call `useCreateStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStateMutation, { data, loading, error }] = useCreateStateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateStateMutation,
    CreateStateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateStateMutation, CreateStateMutationVariables>(
    CreateStateDocument,
    options
  );
}
export type CreateStateMutationHookResult = ReturnType<
  typeof useCreateStateMutation
>;
export type CreateStateMutationResult =
  Apollo.MutationResult<CreateStateMutation>;
export type CreateStateMutationOptions = Apollo.BaseMutationOptions<
  CreateStateMutation,
  CreateStateMutationVariables
>;
export const UpdateStateDocument = gql`
  mutation UpdateState($input: UpdateStateInput!) {
    updateState(input: $input) {
      state {
        id
        name
      }
    }
  }
`;
export type UpdateStateMutationFn = Apollo.MutationFunction<
  UpdateStateMutation,
  UpdateStateMutationVariables
>;

/**
 * __useUpdateStateMutation__
 *
 * To run a mutation, you first call `useUpdateStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStateMutation, { data, loading, error }] = useUpdateStateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateStateMutation,
    UpdateStateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateStateMutation, UpdateStateMutationVariables>(
    UpdateStateDocument,
    options
  );
}
export type UpdateStateMutationHookResult = ReturnType<
  typeof useUpdateStateMutation
>;
export type UpdateStateMutationResult =
  Apollo.MutationResult<UpdateStateMutation>;
export type UpdateStateMutationOptions = Apollo.BaseMutationOptions<
  UpdateStateMutation,
  UpdateStateMutationVariables
>;
export const CreateCityDocument = gql`
  mutation CreateCity($input: CreateCityInput!) {
    createCity(input: $input) {
      city {
        id
        name
        zipCodes
      }
    }
  }
`;
export type CreateCityMutationFn = Apollo.MutationFunction<
  CreateCityMutation,
  CreateCityMutationVariables
>;

/**
 * __useCreateCityMutation__
 *
 * To run a mutation, you first call `useCreateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCityMutation, { data, loading, error }] = useCreateCityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCityMutation,
    CreateCityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCityMutation, CreateCityMutationVariables>(
    CreateCityDocument,
    options
  );
}
export type CreateCityMutationHookResult = ReturnType<
  typeof useCreateCityMutation
>;
export type CreateCityMutationResult =
  Apollo.MutationResult<CreateCityMutation>;
export type CreateCityMutationOptions = Apollo.BaseMutationOptions<
  CreateCityMutation,
  CreateCityMutationVariables
>;
export const UpdateCityDocument = gql`
  mutation UpdateCity($input: UpdateCityInput!) {
    updateCity(input: $input) {
      city {
        id
        name
        zipCodes
      }
    }
  }
`;
export type UpdateCityMutationFn = Apollo.MutationFunction<
  UpdateCityMutation,
  UpdateCityMutationVariables
>;

/**
 * __useUpdateCityMutation__
 *
 * To run a mutation, you first call `useUpdateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCityMutation, { data, loading, error }] = useUpdateCityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCityMutation,
    UpdateCityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCityMutation, UpdateCityMutationVariables>(
    UpdateCityDocument,
    options
  );
}
export type UpdateCityMutationHookResult = ReturnType<
  typeof useUpdateCityMutation
>;
export type UpdateCityMutationResult =
  Apollo.MutationResult<UpdateCityMutation>;
export type UpdateCityMutationOptions = Apollo.BaseMutationOptions<
  UpdateCityMutation,
  UpdateCityMutationVariables
>;
export const CreateProvinceDocument = gql`
  mutation CreateProvince($input: CreateProvinceInput!) {
    createProvince(input: $input) {
      province {
        id
        name
      }
    }
  }
`;
export type CreateProvinceMutationFn = Apollo.MutationFunction<
  CreateProvinceMutation,
  CreateProvinceMutationVariables
>;

/**
 * __useCreateProvinceMutation__
 *
 * To run a mutation, you first call `useCreateProvinceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProvinceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProvinceMutation, { data, loading, error }] = useCreateProvinceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProvinceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProvinceMutation,
    CreateProvinceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProvinceMutation,
    CreateProvinceMutationVariables
  >(CreateProvinceDocument, options);
}
export type CreateProvinceMutationHookResult = ReturnType<
  typeof useCreateProvinceMutation
>;
export type CreateProvinceMutationResult =
  Apollo.MutationResult<CreateProvinceMutation>;
export type CreateProvinceMutationOptions = Apollo.BaseMutationOptions<
  CreateProvinceMutation,
  CreateProvinceMutationVariables
>;
export const UpdateProvinceDocument = gql`
  mutation UpdateProvince($input: UpdateProvinceInput!) {
    updateProvince(input: $input) {
      province {
        id
        name
      }
    }
  }
`;
export type UpdateProvinceMutationFn = Apollo.MutationFunction<
  UpdateProvinceMutation,
  UpdateProvinceMutationVariables
>;

/**
 * __useUpdateProvinceMutation__
 *
 * To run a mutation, you first call `useUpdateProvinceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProvinceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProvinceMutation, { data, loading, error }] = useUpdateProvinceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProvinceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProvinceMutation,
    UpdateProvinceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProvinceMutation,
    UpdateProvinceMutationVariables
  >(UpdateProvinceDocument, options);
}
export type UpdateProvinceMutationHookResult = ReturnType<
  typeof useUpdateProvinceMutation
>;
export type UpdateProvinceMutationResult =
  Apollo.MutationResult<UpdateProvinceMutation>;
export type UpdateProvinceMutationOptions = Apollo.BaseMutationOptions<
  UpdateProvinceMutation,
  UpdateProvinceMutationVariables
>;
export const CreateMunicipalityDocument = gql`
  mutation CreateMunicipality($input: CreateMunicipalityInput!) {
    createMunicipality(input: $input) {
      municipality {
        id
        name
      }
    }
  }
`;
export type CreateMunicipalityMutationFn = Apollo.MutationFunction<
  CreateMunicipalityMutation,
  CreateMunicipalityMutationVariables
>;

/**
 * __useCreateMunicipalityMutation__
 *
 * To run a mutation, you first call `useCreateMunicipalityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMunicipalityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMunicipalityMutation, { data, loading, error }] = useCreateMunicipalityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMunicipalityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMunicipalityMutation,
    CreateMunicipalityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateMunicipalityMutation,
    CreateMunicipalityMutationVariables
  >(CreateMunicipalityDocument, options);
}
export type CreateMunicipalityMutationHookResult = ReturnType<
  typeof useCreateMunicipalityMutation
>;
export type CreateMunicipalityMutationResult =
  Apollo.MutationResult<CreateMunicipalityMutation>;
export type CreateMunicipalityMutationOptions = Apollo.BaseMutationOptions<
  CreateMunicipalityMutation,
  CreateMunicipalityMutationVariables
>;
export const UpdateMunicipalityDocument = gql`
  mutation UpdateMunicipality($input: UpdateMunicipalityInput!) {
    updateMunicipality(input: $input) {
      municipality {
        id
        name
      }
    }
  }
`;
export type UpdateMunicipalityMutationFn = Apollo.MutationFunction<
  UpdateMunicipalityMutation,
  UpdateMunicipalityMutationVariables
>;

/**
 * __useUpdateMunicipalityMutation__
 *
 * To run a mutation, you first call `useUpdateMunicipalityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMunicipalityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMunicipalityMutation, { data, loading, error }] = useUpdateMunicipalityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMunicipalityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMunicipalityMutation,
    UpdateMunicipalityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateMunicipalityMutation,
    UpdateMunicipalityMutationVariables
  >(UpdateMunicipalityDocument, options);
}
export type UpdateMunicipalityMutationHookResult = ReturnType<
  typeof useUpdateMunicipalityMutation
>;
export type UpdateMunicipalityMutationResult =
  Apollo.MutationResult<UpdateMunicipalityMutation>;
export type UpdateMunicipalityMutationOptions = Apollo.BaseMutationOptions<
  UpdateMunicipalityMutation,
  UpdateMunicipalityMutationVariables
>;
export const CreateNeighborhoodDocument = gql`
  mutation CreateNeighborhood($input: CreateNeighborhoodInput!) {
    createNeighborhood(input: $input) {
      neighborhood {
        id
        name
      }
    }
  }
`;
export type CreateNeighborhoodMutationFn = Apollo.MutationFunction<
  CreateNeighborhoodMutation,
  CreateNeighborhoodMutationVariables
>;

/**
 * __useCreateNeighborhoodMutation__
 *
 * To run a mutation, you first call `useCreateNeighborhoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNeighborhoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNeighborhoodMutation, { data, loading, error }] = useCreateNeighborhoodMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNeighborhoodMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNeighborhoodMutation,
    CreateNeighborhoodMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNeighborhoodMutation,
    CreateNeighborhoodMutationVariables
  >(CreateNeighborhoodDocument, options);
}
export type CreateNeighborhoodMutationHookResult = ReturnType<
  typeof useCreateNeighborhoodMutation
>;
export type CreateNeighborhoodMutationResult =
  Apollo.MutationResult<CreateNeighborhoodMutation>;
export type CreateNeighborhoodMutationOptions = Apollo.BaseMutationOptions<
  CreateNeighborhoodMutation,
  CreateNeighborhoodMutationVariables
>;
export const UpdateNeighborhoodDocument = gql`
  mutation UpdateNeighborhood($input: UpdateNeighborhoodInput!) {
    updateNeighborhood(input: $input) {
      neighborhood {
        id
        name
      }
    }
  }
`;
export type UpdateNeighborhoodMutationFn = Apollo.MutationFunction<
  UpdateNeighborhoodMutation,
  UpdateNeighborhoodMutationVariables
>;

/**
 * __useUpdateNeighborhoodMutation__
 *
 * To run a mutation, you first call `useUpdateNeighborhoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNeighborhoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNeighborhoodMutation, { data, loading, error }] = useUpdateNeighborhoodMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNeighborhoodMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateNeighborhoodMutation,
    UpdateNeighborhoodMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateNeighborhoodMutation,
    UpdateNeighborhoodMutationVariables
  >(UpdateNeighborhoodDocument, options);
}
export type UpdateNeighborhoodMutationHookResult = ReturnType<
  typeof useUpdateNeighborhoodMutation
>;
export type UpdateNeighborhoodMutationResult =
  Apollo.MutationResult<UpdateNeighborhoodMutation>;
export type UpdateNeighborhoodMutationOptions = Apollo.BaseMutationOptions<
  UpdateNeighborhoodMutation,
  UpdateNeighborhoodMutationVariables
>;
export const CreatePresignPutFileUrlDocument = gql`
  mutation CreatePresignPutFileUrl($input: CreatePresignPutFileUrlInput!) {
    createPresignPutFileUrl(input: $input) {
      url
      path
    }
  }
`;
export type CreatePresignPutFileUrlMutationFn = Apollo.MutationFunction<
  CreatePresignPutFileUrlMutation,
  CreatePresignPutFileUrlMutationVariables
>;

/**
 * __useCreatePresignPutFileUrlMutation__
 *
 * To run a mutation, you first call `useCreatePresignPutFileUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePresignPutFileUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPresignPutFileUrlMutation, { data, loading, error }] = useCreatePresignPutFileUrlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePresignPutFileUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePresignPutFileUrlMutation,
    CreatePresignPutFileUrlMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePresignPutFileUrlMutation,
    CreatePresignPutFileUrlMutationVariables
  >(CreatePresignPutFileUrlDocument, options);
}
export type CreatePresignPutFileUrlMutationHookResult = ReturnType<
  typeof useCreatePresignPutFileUrlMutation
>;
export type CreatePresignPutFileUrlMutationResult =
  Apollo.MutationResult<CreatePresignPutFileUrlMutation>;
export type CreatePresignPutFileUrlMutationOptions = Apollo.BaseMutationOptions<
  CreatePresignPutFileUrlMutation,
  CreatePresignPutFileUrlMutationVariables
>;
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser(input: {}) {
      user {
        id
        firstName
        lastName
        email
        phone
        createdAt
      }
    }
  }
`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options
  );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
export const PartnersDocument = gql`
  query Partners($input: PartnersInput!) {
    partners(input: $input) {
      partners {
        id
        name
      }
    }
  }
`;

/**
 * __usePartnersQuery__
 *
 * To run a query within a React component, call `usePartnersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePartnersQuery(
  baseOptions: Apollo.QueryHookOptions<PartnersQuery, PartnersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnersQuery, PartnersQueryVariables>(
    PartnersDocument,
    options
  );
}
export function usePartnersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnersQuery,
    PartnersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnersQuery, PartnersQueryVariables>(
    PartnersDocument,
    options
  );
}
export type PartnersQueryHookResult = ReturnType<typeof usePartnersQuery>;
export type PartnersLazyQueryHookResult = ReturnType<
  typeof usePartnersLazyQuery
>;
export type PartnersQueryResult = Apollo.QueryResult<
  PartnersQuery,
  PartnersQueryVariables
>;
export const PartnerDocument = gql`
  query Partner($input: PartnerInput!) {
    partner(input: $input) {
      partner {
        id
        name
      }
    }
  }
`;

/**
 * __usePartnerQuery__
 *
 * To run a query within a React component, call `usePartnerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnerQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePartnerQuery(
  baseOptions: Apollo.QueryHookOptions<PartnerQuery, PartnerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnerQuery, PartnerQueryVariables>(
    PartnerDocument,
    options
  );
}
export function usePartnerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnerQuery, PartnerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnerQuery, PartnerQueryVariables>(
    PartnerDocument,
    options
  );
}
export type PartnerQueryHookResult = ReturnType<typeof usePartnerQuery>;
export type PartnerLazyQueryHookResult = ReturnType<typeof usePartnerLazyQuery>;
export type PartnerQueryResult = Apollo.QueryResult<
  PartnerQuery,
  PartnerQueryVariables
>;
export const StaffUsersDocument = gql`
  query StaffUsers($input: StaffUsersInput!) {
    staffUsers(input: $input) {
      total
      staffUsers {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;

/**
 * __useStaffUsersQuery__
 *
 * To run a query within a React component, call `useStaffUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStaffUsersQuery(
  baseOptions: Apollo.QueryHookOptions<
    StaffUsersQuery,
    StaffUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StaffUsersQuery, StaffUsersQueryVariables>(
    StaffUsersDocument,
    options
  );
}
export function useStaffUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    StaffUsersQuery,
    StaffUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StaffUsersQuery, StaffUsersQueryVariables>(
    StaffUsersDocument,
    options
  );
}
export type StaffUsersQueryHookResult = ReturnType<typeof useStaffUsersQuery>;
export type StaffUsersLazyQueryHookResult = ReturnType<
  typeof useStaffUsersLazyQuery
>;
export type StaffUsersQueryResult = Apollo.QueryResult<
  StaffUsersQuery,
  StaffUsersQueryVariables
>;
export const StaffUserDocument = gql`
  query StaffUser($input: StaffUserInput!) {
    staffUser(input: $input) {
      staffUser {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;

/**
 * __useStaffUserQuery__
 *
 * To run a query within a React component, call `useStaffUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStaffUserQuery(
  baseOptions: Apollo.QueryHookOptions<StaffUserQuery, StaffUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StaffUserQuery, StaffUserQueryVariables>(
    StaffUserDocument,
    options
  );
}
export function useStaffUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    StaffUserQuery,
    StaffUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StaffUserQuery, StaffUserQueryVariables>(
    StaffUserDocument,
    options
  );
}
export type StaffUserQueryHookResult = ReturnType<typeof useStaffUserQuery>;
export type StaffUserLazyQueryHookResult = ReturnType<
  typeof useStaffUserLazyQuery
>;
export type StaffUserQueryResult = Apollo.QueryResult<
  StaffUserQuery,
  StaffUserQueryVariables
>;
export const ClientUsersDocument = gql`
  query ClientUsers($input: ClientUsersInput!) {
    clientUsers(input: $input) {
      total
      clientUsers {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;

/**
 * __useClientUsersQuery__
 *
 * To run a query within a React component, call `useClientUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useClientUsersQuery(
  baseOptions: Apollo.QueryHookOptions<
    ClientUsersQuery,
    ClientUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ClientUsersQuery, ClientUsersQueryVariables>(
    ClientUsersDocument,
    options
  );
}
export function useClientUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ClientUsersQuery,
    ClientUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ClientUsersQuery, ClientUsersQueryVariables>(
    ClientUsersDocument,
    options
  );
}
export type ClientUsersQueryHookResult = ReturnType<typeof useClientUsersQuery>;
export type ClientUsersLazyQueryHookResult = ReturnType<
  typeof useClientUsersLazyQuery
>;
export type ClientUsersQueryResult = Apollo.QueryResult<
  ClientUsersQuery,
  ClientUsersQueryVariables
>;
export const ClientUserDocument = gql`
  query ClientUser($input: ClientUserInput!) {
    clientUser(input: $input) {
      clientUser {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;

/**
 * __useClientUserQuery__
 *
 * To run a query within a React component, call `useClientUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useClientUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    ClientUserQuery,
    ClientUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ClientUserQuery, ClientUserQueryVariables>(
    ClientUserDocument,
    options
  );
}
export function useClientUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ClientUserQuery,
    ClientUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ClientUserQuery, ClientUserQueryVariables>(
    ClientUserDocument,
    options
  );
}
export type ClientUserQueryHookResult = ReturnType<typeof useClientUserQuery>;
export type ClientUserLazyQueryHookResult = ReturnType<
  typeof useClientUserLazyQuery
>;
export type ClientUserQueryResult = Apollo.QueryResult<
  ClientUserQuery,
  ClientUserQueryVariables
>;
export const DriverUsersDocument = gql`
  query DriverUsers($input: DriverUsersInput!) {
    driverUsers(input: $input) {
      total
      driverUsers {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;

/**
 * __useDriverUsersQuery__
 *
 * To run a query within a React component, call `useDriverUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useDriverUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDriverUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDriverUsersQuery(
  baseOptions: Apollo.QueryHookOptions<
    DriverUsersQuery,
    DriverUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DriverUsersQuery, DriverUsersQueryVariables>(
    DriverUsersDocument,
    options
  );
}
export function useDriverUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DriverUsersQuery,
    DriverUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DriverUsersQuery, DriverUsersQueryVariables>(
    DriverUsersDocument,
    options
  );
}
export type DriverUsersQueryHookResult = ReturnType<typeof useDriverUsersQuery>;
export type DriverUsersLazyQueryHookResult = ReturnType<
  typeof useDriverUsersLazyQuery
>;
export type DriverUsersQueryResult = Apollo.QueryResult<
  DriverUsersQuery,
  DriverUsersQueryVariables
>;
export const DriverUserDocument = gql`
  query DriverUser($input: DriverUserInput!) {
    driverUser(input: $input) {
      driverUser {
        id
        type
        isEnabled
        partner {
          id
          name
        }
        firstName
        lastName
        email
        isEmailVerified
        phone
        isPhoneVerified
        createdAt
      }
    }
  }
`;

/**
 * __useDriverUserQuery__
 *
 * To run a query within a React component, call `useDriverUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useDriverUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDriverUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDriverUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    DriverUserQuery,
    DriverUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DriverUserQuery, DriverUserQueryVariables>(
    DriverUserDocument,
    options
  );
}
export function useDriverUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DriverUserQuery,
    DriverUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DriverUserQuery, DriverUserQueryVariables>(
    DriverUserDocument,
    options
  );
}
export type DriverUserQueryHookResult = ReturnType<typeof useDriverUserQuery>;
export type DriverUserLazyQueryHookResult = ReturnType<
  typeof useDriverUserLazyQuery
>;
export type DriverUserQueryResult = Apollo.QueryResult<
  DriverUserQuery,
  DriverUserQueryVariables
>;
export const OrdersDocument = gql`
  query Orders($input: OrdersInput!) {
    orders(input: $input) {
      total
      orders {
        id
        code
        externalId
        serviceType
        status
        subtotal
        discount
        vat
        total
        createdAt
        client {
          id
          firstName
          lastName
        }
        driver {
          id
          firstName
          lastName
          vehicle {
            id
            make
            model
            year
            color
            plate
          }
        }
        partner {
          id
          name
        }
        sender {
          firstName
          lastName
          phone
          email
          address {
            line1
            line2
            city
            state
            zipCode
            coordinates {
              latitude
              longitude
            }
          }
        }
        ... on DeliveryOrder {
          recipient {
            firstName
            lastName
            phone
            email
            identityCardNumber
            address {
              line1
              line2
              neighborhood
              municipality
              province
              postalCode
              coordinates {
                latitude
                longitude
              }
            }
            notes
          }
        }
        paymentMethod {
          ... on OrderCard {
            id
            type
            brand
            last4
            expMonth
            expYear
          }
          ... on OrderPartnerBalance {
            id
            type
          }
        }
        items {
          id
          quantity
          total
          product {
            ... on OrderArticle {
              id
              type
              price
              name
              description
              imagePath
              variant {
                id
                name
              }
              deliveryType {
                id
                name
              }
            }
            ... on OrderLuggage {
              type
              price
              size {
                id
                price
              }
            }
          }
        }
        addons {
          ... on OrderHomePickupAddon {
            id
            type
            total
            price
            freeThresholdAmount
            date
            hourRange {
              startAt
              endAt
            }
          }
          ... on OrderHomeWrappingAddon {
            id
            type
            total
            price
            freeThresholdAmount
            date
            hourRange {
              startAt
              endAt
            }
          }
        }
      }
    }
  }
`;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrdersQuery(
  baseOptions: Apollo.QueryHookOptions<OrdersQuery, OrdersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrdersQuery, OrdersQueryVariables>(
    OrdersDocument,
    options
  );
}
export function useOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OrdersQuery, OrdersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrdersQuery, OrdersQueryVariables>(
    OrdersDocument,
    options
  );
}
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersQueryResult = Apollo.QueryResult<
  OrdersQuery,
  OrdersQueryVariables
>;
export const OrderDocument = gql`
  query Order($input: OrderInput!) {
    order(input: $input) {
      order {
        id
        code
        externalId
        serviceType
        status
        subtotal
        discount
        vat
        total
        createdAt
        client {
          id
          firstName
          lastName
        }
        driver {
          id
          firstName
          lastName
          vehicle {
            id
            make
            model
            year
            color
            plate
          }
        }
        partner {
          id
          name
        }
        sender {
          firstName
          lastName
          phone
          email
          address {
            line1
            line2
            city
            state
            zipCode
            coordinates {
              latitude
              longitude
            }
          }
        }
        ... on DeliveryOrder {
          recipient {
            firstName
            lastName
            phone
            email
            identityCardNumber
            address {
              line1
              line2
              neighborhood
              municipality
              province
              postalCode
              coordinates {
                latitude
                longitude
              }
            }
            notes
          }
        }
        paymentMethod {
          ... on OrderCard {
            id
            type
            brand
            last4
            expMonth
            expYear
          }
          ... on OrderPartnerBalance {
            id
            type
          }
        }
        items {
          id
          quantity
          total
          product {
            ... on OrderArticle {
              id
              type
              price
              name
              description
              imagePath
              variant {
                id
                name
              }
              deliveryType {
                id
                name
              }
            }
            ... on OrderLuggage {
              type
              price
              size {
                id
                price
              }
            }
          }
        }
        addons {
          ... on OrderHomePickupAddon {
            id
            type
            total
            price
            freeThresholdAmount
            date
            hourRange {
              startAt
              endAt
            }
          }
          ... on OrderHomeWrappingAddon {
            id
            type
            total
            price
            freeThresholdAmount
            date
            hourRange {
              startAt
              endAt
            }
          }
        }
      }
    }
  }
`;

/**
 * __useOrderQuery__
 *
 * To run a query within a React component, call `useOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderQuery(
  baseOptions: Apollo.QueryHookOptions<OrderQuery, OrderQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrderQuery, OrderQueryVariables>(
    OrderDocument,
    options
  );
}
export function useOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OrderQuery, OrderQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrderQuery, OrderQueryVariables>(
    OrderDocument,
    options
  );
}
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>;
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>;
export type OrderQueryResult = Apollo.QueryResult<
  OrderQuery,
  OrderQueryVariables
>;
export const ArticlesDocument = gql`
  query Articles($input: ArticlesInput!) {
    articles(input: $input) {
      articles {
        id
        name
        description
        imagePath
        isEnabled
        variants {
          id
          name
          isEnabled
        }
      }
    }
  }
`;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticlesQuery(
  baseOptions: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(
    ArticlesDocument,
    options
  );
}
export function useArticlesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ArticlesQuery,
    ArticlesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(
    ArticlesDocument,
    options
  );
}
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<
  typeof useArticlesLazyQuery
>;
export type ArticlesQueryResult = Apollo.QueryResult<
  ArticlesQuery,
  ArticlesQueryVariables
>;
export const ArticleDocument = gql`
  query Article($input: ArticleInput!) {
    article(input: $input) {
      article {
        id
        name
        description
        imagePath
        isEnabled
        variants {
          id
          name
          isEnabled
        }
      }
    }
  }
`;

/**
 * __useArticleQuery__
 *
 * To run a query within a React component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleQuery(
  baseOptions: Apollo.QueryHookOptions<ArticleQuery, ArticleQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ArticleQuery, ArticleQueryVariables>(
    ArticleDocument,
    options
  );
}
export function useArticleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ArticleQuery, ArticleQueryVariables>(
    ArticleDocument,
    options
  );
}
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleQueryResult = Apollo.QueryResult<
  ArticleQuery,
  ArticleQueryVariables
>;
export const DeliveryTypesDocument = gql`
  query DeliveryTypes($input: DeliveryTypesInput!) {
    deliveryTypes(input: $input) {
      deliveryTypes {
        id
        name
        icon
        description
        isEnabled
      }
    }
  }
`;

/**
 * __useDeliveryTypesQuery__
 *
 * To run a query within a React component, call `useDeliveryTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryTypesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeliveryTypesQuery(
  baseOptions: Apollo.QueryHookOptions<
    DeliveryTypesQuery,
    DeliveryTypesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DeliveryTypesQuery, DeliveryTypesQueryVariables>(
    DeliveryTypesDocument,
    options
  );
}
export function useDeliveryTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DeliveryTypesQuery,
    DeliveryTypesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DeliveryTypesQuery, DeliveryTypesQueryVariables>(
    DeliveryTypesDocument,
    options
  );
}
export type DeliveryTypesQueryHookResult = ReturnType<
  typeof useDeliveryTypesQuery
>;
export type DeliveryTypesLazyQueryHookResult = ReturnType<
  typeof useDeliveryTypesLazyQuery
>;
export type DeliveryTypesQueryResult = Apollo.QueryResult<
  DeliveryTypesQuery,
  DeliveryTypesQueryVariables
>;
export const DeliveryTypeDocument = gql`
  query DeliveryType($input: DeliveryTypeInput!) {
    deliveryType(input: $input) {
      deliveryType {
        id
        name
        icon
        description
        isEnabled
      }
    }
  }
`;

/**
 * __useDeliveryTypeQuery__
 *
 * To run a query within a React component, call `useDeliveryTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryTypeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeliveryTypeQuery(
  baseOptions: Apollo.QueryHookOptions<
    DeliveryTypeQuery,
    DeliveryTypeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DeliveryTypeQuery, DeliveryTypeQueryVariables>(
    DeliveryTypeDocument,
    options
  );
}
export function useDeliveryTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DeliveryTypeQuery,
    DeliveryTypeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DeliveryTypeQuery, DeliveryTypeQueryVariables>(
    DeliveryTypeDocument,
    options
  );
}
export type DeliveryTypeQueryHookResult = ReturnType<
  typeof useDeliveryTypeQuery
>;
export type DeliveryTypeLazyQueryHookResult = ReturnType<
  typeof useDeliveryTypeLazyQuery
>;
export type DeliveryTypeQueryResult = Apollo.QueryResult<
  DeliveryTypeQuery,
  DeliveryTypeQueryVariables
>;
export const PricingRulesDocument = gql`
  query PricingRules($input: PricingRulesInput!) {
    pricingRules(input: $input) {
      pricingRules {
        ... on ArticlePricingRule {
          id
          type
          isEnabled
          price
          partner {
            id
            name
          }
          location {
            id
            name
          }
          deliveryType {
            id
            name
          }
          article {
            id
            name
          }
          articleVariant {
            id
            name
          }
        }
      }
    }
  }
`;

/**
 * __usePricingRulesQuery__
 *
 * To run a query within a React component, call `usePricingRulesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePricingRulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePricingRulesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePricingRulesQuery(
  baseOptions: Apollo.QueryHookOptions<
    PricingRulesQuery,
    PricingRulesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PricingRulesQuery, PricingRulesQueryVariables>(
    PricingRulesDocument,
    options
  );
}
export function usePricingRulesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PricingRulesQuery,
    PricingRulesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PricingRulesQuery, PricingRulesQueryVariables>(
    PricingRulesDocument,
    options
  );
}
export type PricingRulesQueryHookResult = ReturnType<
  typeof usePricingRulesQuery
>;
export type PricingRulesLazyQueryHookResult = ReturnType<
  typeof usePricingRulesLazyQuery
>;
export type PricingRulesQueryResult = Apollo.QueryResult<
  PricingRulesQuery,
  PricingRulesQueryVariables
>;
export const PricingRuleDocument = gql`
  query PricingRule($input: PricingRuleInput!) {
    pricingRule(input: $input) {
      pricingRule {
        ... on ArticlePricingRule {
          id
          type
          isEnabled
          price
          partner {
            id
            name
          }
          location {
            id
            name
          }
          deliveryType {
            id
            name
          }
          article {
            id
            name
          }
          articleVariant {
            id
            name
          }
        }
      }
    }
  }
`;

/**
 * __usePricingRuleQuery__
 *
 * To run a query within a React component, call `usePricingRuleQuery` and pass it any options that fit your needs.
 * When your component renders, `usePricingRuleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePricingRuleQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePricingRuleQuery(
  baseOptions: Apollo.QueryHookOptions<
    PricingRuleQuery,
    PricingRuleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PricingRuleQuery, PricingRuleQueryVariables>(
    PricingRuleDocument,
    options
  );
}
export function usePricingRuleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PricingRuleQuery,
    PricingRuleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PricingRuleQuery, PricingRuleQueryVariables>(
    PricingRuleDocument,
    options
  );
}
export type PricingRuleQueryHookResult = ReturnType<typeof usePricingRuleQuery>;
export type PricingRuleLazyQueryHookResult = ReturnType<
  typeof usePricingRuleLazyQuery
>;
export type PricingRuleQueryResult = Apollo.QueryResult<
  PricingRuleQuery,
  PricingRuleQueryVariables
>;
export const CountriesDocument = gql`
  query Countries($input: CountriesInput!) {
    countries(input: $input) {
      countries {
        id
        name
      }
    }
  }
`;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCountriesQuery(
  baseOptions: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(
    CountriesDocument,
    options
  );
}
export function useCountriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CountriesQuery,
    CountriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(
    CountriesDocument,
    options
  );
}
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<
  typeof useCountriesLazyQuery
>;
export type CountriesQueryResult = Apollo.QueryResult<
  CountriesQuery,
  CountriesQueryVariables
>;
export const CountryDocument = gql`
  query Country($input: CountryInput!) {
    country(input: $input) {
      country {
        id
        name
      }
    }
  }
`;

/**
 * __useCountryQuery__
 *
 * To run a query within a React component, call `useCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCountryQuery(
  baseOptions: Apollo.QueryHookOptions<CountryQuery, CountryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CountryQuery, CountryQueryVariables>(
    CountryDocument,
    options
  );
}
export function useCountryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CountryQuery, CountryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CountryQuery, CountryQueryVariables>(
    CountryDocument,
    options
  );
}
export type CountryQueryHookResult = ReturnType<typeof useCountryQuery>;
export type CountryLazyQueryHookResult = ReturnType<typeof useCountryLazyQuery>;
export type CountryQueryResult = Apollo.QueryResult<
  CountryQuery,
  CountryQueryVariables
>;
export const StatesDocument = gql`
  query States($input: StatesInput!) {
    states(input: $input) {
      states {
        id
        name
      }
    }
  }
`;

/**
 * __useStatesQuery__
 *
 * To run a query within a React component, call `useStatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStatesQuery(
  baseOptions: Apollo.QueryHookOptions<StatesQuery, StatesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StatesQuery, StatesQueryVariables>(
    StatesDocument,
    options
  );
}
export function useStatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<StatesQuery, StatesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StatesQuery, StatesQueryVariables>(
    StatesDocument,
    options
  );
}
export type StatesQueryHookResult = ReturnType<typeof useStatesQuery>;
export type StatesLazyQueryHookResult = ReturnType<typeof useStatesLazyQuery>;
export type StatesQueryResult = Apollo.QueryResult<
  StatesQuery,
  StatesQueryVariables
>;
export const StateDocument = gql`
  query State($input: StateInput!) {
    state(input: $input) {
      state {
        id
        name
      }
    }
  }
`;

/**
 * __useStateQuery__
 *
 * To run a query within a React component, call `useStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStateQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStateQuery(
  baseOptions: Apollo.QueryHookOptions<StateQuery, StateQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StateQuery, StateQueryVariables>(
    StateDocument,
    options
  );
}
export function useStateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<StateQuery, StateQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StateQuery, StateQueryVariables>(
    StateDocument,
    options
  );
}
export type StateQueryHookResult = ReturnType<typeof useStateQuery>;
export type StateLazyQueryHookResult = ReturnType<typeof useStateLazyQuery>;
export type StateQueryResult = Apollo.QueryResult<
  StateQuery,
  StateQueryVariables
>;
export const CitiesDocument = gql`
  query Cities($input: CitiesInput!) {
    cities(input: $input) {
      cities {
        id
        name
        zipCodes
      }
    }
  }
`;

/**
 * __useCitiesQuery__
 *
 * To run a query within a React component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCitiesQuery(
  baseOptions: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(
    CitiesDocument,
    options
  );
}
export function useCitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(
    CitiesDocument,
    options
  );
}
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = Apollo.QueryResult<
  CitiesQuery,
  CitiesQueryVariables
>;
export const CityDocument = gql`
  query City($input: CityInput!) {
    city(input: $input) {
      city {
        id
        name
        zipCodes
      }
    }
  }
`;

/**
 * __useCityQuery__
 *
 * To run a query within a React component, call `useCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCityQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCityQuery(
  baseOptions: Apollo.QueryHookOptions<CityQuery, CityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CityQuery, CityQueryVariables>(CityDocument, options);
}
export function useCityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CityQuery, CityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CityQuery, CityQueryVariables>(
    CityDocument,
    options
  );
}
export type CityQueryHookResult = ReturnType<typeof useCityQuery>;
export type CityLazyQueryHookResult = ReturnType<typeof useCityLazyQuery>;
export type CityQueryResult = Apollo.QueryResult<CityQuery, CityQueryVariables>;
export const ProvincesDocument = gql`
  query Provinces($input: ProvincesInput!) {
    provinces(input: $input) {
      provinces {
        id
        name
      }
    }
  }
`;

/**
 * __useProvincesQuery__
 *
 * To run a query within a React component, call `useProvincesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProvincesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProvincesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProvincesQuery(
  baseOptions: Apollo.QueryHookOptions<ProvincesQuery, ProvincesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProvincesQuery, ProvincesQueryVariables>(
    ProvincesDocument,
    options
  );
}
export function useProvincesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProvincesQuery,
    ProvincesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProvincesQuery, ProvincesQueryVariables>(
    ProvincesDocument,
    options
  );
}
export type ProvincesQueryHookResult = ReturnType<typeof useProvincesQuery>;
export type ProvincesLazyQueryHookResult = ReturnType<
  typeof useProvincesLazyQuery
>;
export type ProvincesQueryResult = Apollo.QueryResult<
  ProvincesQuery,
  ProvincesQueryVariables
>;
export const ProvinceDocument = gql`
  query Province($input: ProvinceInput!) {
    province(input: $input) {
      province {
        id
        name
      }
    }
  }
`;

/**
 * __useProvinceQuery__
 *
 * To run a query within a React component, call `useProvinceQuery` and pass it any options that fit your needs.
 * When your component renders, `useProvinceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProvinceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProvinceQuery(
  baseOptions: Apollo.QueryHookOptions<ProvinceQuery, ProvinceQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProvinceQuery, ProvinceQueryVariables>(
    ProvinceDocument,
    options
  );
}
export function useProvinceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProvinceQuery,
    ProvinceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProvinceQuery, ProvinceQueryVariables>(
    ProvinceDocument,
    options
  );
}
export type ProvinceQueryHookResult = ReturnType<typeof useProvinceQuery>;
export type ProvinceLazyQueryHookResult = ReturnType<
  typeof useProvinceLazyQuery
>;
export type ProvinceQueryResult = Apollo.QueryResult<
  ProvinceQuery,
  ProvinceQueryVariables
>;
export const MunicipalitiesDocument = gql`
  query Municipalities($input: MunicipalitiesInput!) {
    municipalities(input: $input) {
      municipalities {
        id
        name
      }
    }
  }
`;

/**
 * __useMunicipalitiesQuery__
 *
 * To run a query within a React component, call `useMunicipalitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMunicipalitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMunicipalitiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMunicipalitiesQuery(
  baseOptions: Apollo.QueryHookOptions<
    MunicipalitiesQuery,
    MunicipalitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MunicipalitiesQuery, MunicipalitiesQueryVariables>(
    MunicipalitiesDocument,
    options
  );
}
export function useMunicipalitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MunicipalitiesQuery,
    MunicipalitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MunicipalitiesQuery, MunicipalitiesQueryVariables>(
    MunicipalitiesDocument,
    options
  );
}
export type MunicipalitiesQueryHookResult = ReturnType<
  typeof useMunicipalitiesQuery
>;
export type MunicipalitiesLazyQueryHookResult = ReturnType<
  typeof useMunicipalitiesLazyQuery
>;
export type MunicipalitiesQueryResult = Apollo.QueryResult<
  MunicipalitiesQuery,
  MunicipalitiesQueryVariables
>;
export const MunicipalityDocument = gql`
  query Municipality($input: MunicipalityInput!) {
    municipality(input: $input) {
      municipality {
        id
        name
      }
    }
  }
`;

/**
 * __useMunicipalityQuery__
 *
 * To run a query within a React component, call `useMunicipalityQuery` and pass it any options that fit your needs.
 * When your component renders, `useMunicipalityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMunicipalityQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMunicipalityQuery(
  baseOptions: Apollo.QueryHookOptions<
    MunicipalityQuery,
    MunicipalityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MunicipalityQuery, MunicipalityQueryVariables>(
    MunicipalityDocument,
    options
  );
}
export function useMunicipalityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MunicipalityQuery,
    MunicipalityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MunicipalityQuery, MunicipalityQueryVariables>(
    MunicipalityDocument,
    options
  );
}
export type MunicipalityQueryHookResult = ReturnType<
  typeof useMunicipalityQuery
>;
export type MunicipalityLazyQueryHookResult = ReturnType<
  typeof useMunicipalityLazyQuery
>;
export type MunicipalityQueryResult = Apollo.QueryResult<
  MunicipalityQuery,
  MunicipalityQueryVariables
>;
export const NeighborhoodsDocument = gql`
  query Neighborhoods($input: NeighborhoodsInput!) {
    neighborhoods(input: $input) {
      neighborhoods {
        id
        name
      }
    }
  }
`;

/**
 * __useNeighborhoodsQuery__
 *
 * To run a query within a React component, call `useNeighborhoodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNeighborhoodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNeighborhoodsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNeighborhoodsQuery(
  baseOptions: Apollo.QueryHookOptions<
    NeighborhoodsQuery,
    NeighborhoodsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NeighborhoodsQuery, NeighborhoodsQueryVariables>(
    NeighborhoodsDocument,
    options
  );
}
export function useNeighborhoodsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NeighborhoodsQuery,
    NeighborhoodsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NeighborhoodsQuery, NeighborhoodsQueryVariables>(
    NeighborhoodsDocument,
    options
  );
}
export type NeighborhoodsQueryHookResult = ReturnType<
  typeof useNeighborhoodsQuery
>;
export type NeighborhoodsLazyQueryHookResult = ReturnType<
  typeof useNeighborhoodsLazyQuery
>;
export type NeighborhoodsQueryResult = Apollo.QueryResult<
  NeighborhoodsQuery,
  NeighborhoodsQueryVariables
>;
export const NeighborhoodDocument = gql`
  query Neighborhood($input: NeighborhoodInput!) {
    neighborhood(input: $input) {
      neighborhood {
        id
        name
      }
    }
  }
`;

/**
 * __useNeighborhoodQuery__
 *
 * To run a query within a React component, call `useNeighborhoodQuery` and pass it any options that fit your needs.
 * When your component renders, `useNeighborhoodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNeighborhoodQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNeighborhoodQuery(
  baseOptions: Apollo.QueryHookOptions<
    NeighborhoodQuery,
    NeighborhoodQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NeighborhoodQuery, NeighborhoodQueryVariables>(
    NeighborhoodDocument,
    options
  );
}
export function useNeighborhoodLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NeighborhoodQuery,
    NeighborhoodQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NeighborhoodQuery, NeighborhoodQueryVariables>(
    NeighborhoodDocument,
    options
  );
}
export type NeighborhoodQueryHookResult = ReturnType<
  typeof useNeighborhoodQuery
>;
export type NeighborhoodLazyQueryHookResult = ReturnType<
  typeof useNeighborhoodLazyQuery
>;
export type NeighborhoodQueryResult = Apollo.QueryResult<
  NeighborhoodQuery,
  NeighborhoodQueryVariables
>;
