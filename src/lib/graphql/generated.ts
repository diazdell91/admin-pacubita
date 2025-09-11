import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
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
  DateTime: { input: string; output: string };
  UUID: { input: string; output: string };
};

export enum AddonType {
  HOME_PICKUP = 'HOME_PICKUP',
  HOME_WRAPPING = 'HOME_WRAPPING',
}

export type AddressCoordinates = {
  __typename: 'AddressCoordinates';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type Article = {
  __typename: 'Article';
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
  __typename: 'ArticleOutput';
  article: Article;
};

export type ArticlePricingRule = IPricingRule & {
  __typename: 'ArticlePricingRule';
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
  __typename: 'ArticleVariant';
  id: Scalars['UUID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type ArticlesInput = {
  _: InputMaybe<Scalars['String']['input']>;
};

export type ArticlesOutput = {
  __typename: 'ArticlesOutput';
  articles: Array<Article>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ChangePasswordOutput = {
  __typename: 'ChangePasswordOutput';
  _: Maybe<Scalars['String']['output']>;
};

export type CitiesInput = {
  stateId: Scalars['UUID']['input'];
};

export type CitiesOutput = {
  __typename: 'CitiesOutput';
  cities: Array<City>;
};

export type City = {
  __typename: 'City';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  zipCodes: Array<Scalars['String']['output']>;
};

export type CityInput = {
  id: Scalars['UUID']['input'];
};

export type CityOutput = {
  __typename: 'CityOutput';
  city: City;
};

export type ClientUser = IUser & {
  __typename: 'ClientUser';
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
  __typename: 'ClientUserOutput';
  clientUser: ClientUser;
};

export type ClientUsersInput = {
  pagination: InputMaybe<Pagination>;
  partnerId: InputMaybe<Scalars['UUID']['input']>;
  sorting: InputMaybe<Sorting>;
};

export type ClientUsersOutput = {
  __typename: 'ClientUsersOutput';
  clientUsers: Array<ClientUser>;
  total: Scalars['Int']['output'];
};

export type CountriesInput = {
  _: InputMaybe<Scalars['String']['input']>;
};

export type CountriesOutput = {
  __typename: 'CountriesOutput';
  countries: Array<Country>;
};

export type Country = {
  __typename: 'Country';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type CountryInput = {
  id: Scalars['UUID']['input'];
};

export type CountryOutput = {
  __typename: 'CountryOutput';
  country: Country;
};

export type CreateArticleInput = {
  description: Scalars['String']['input'];
  imagePath: Scalars['String']['input'];
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateArticleOutput = {
  __typename: 'CreateArticleOutput';
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
  __typename: 'CreateArticlePricingRuleOutput';
  articlePricingRule: ArticlePricingRule;
};

export type CreateArticleVariantInput = {
  articleId: Scalars['UUID']['input'];
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateArticleVariantOutput = {
  __typename: 'CreateArticleVariantOutput';
  articleVariant: ArticleVariant;
};

export type CreateCityInput = {
  name: Scalars['String']['input'];
  stateId: Scalars['UUID']['input'];
  zipCodes: Array<Scalars['String']['input']>;
};

export type CreateCityOutput = {
  __typename: 'CreateCityOutput';
  city: City;
};

export type CreateDeliveryTypeInput = {
  description: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateDeliveryTypeOutput = {
  __typename: 'CreateDeliveryTypeOutput';
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
  __typename: 'CreateDriverUserOutput';
  driverUser: DriverUser;
};

export type CreateMunicipalityInput = {
  name: Scalars['String']['input'];
  provinceId: Scalars['UUID']['input'];
};

export type CreateMunicipalityOutput = {
  __typename: 'CreateMunicipalityOutput';
  municipality: Municipality;
};

export type CreateNeighborhoodInput = {
  municipalityId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type CreateNeighborhoodOutput = {
  __typename: 'CreateNeighborhoodOutput';
  neighborhood: Neighborhood;
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
  __typename: 'CreatePartnerUserOutput';
  partnerUser: PartnerUser;
};

export type CreatePresignPutFileUrlInput = {
  fileName: Scalars['String']['input'];
  fileType: FileType;
};

export type CreatePresignPutFileUrlOutput = {
  __typename: 'CreatePresignPutFileUrlOutput';
  path: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type CreateProvinceInput = {
  countryId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type CreateProvinceOutput = {
  __typename: 'CreateProvinceOutput';
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
  __typename: 'CreateStaffUserOutput';
  staffUser: StaffUser;
};

export type CreateStateInput = {
  countryId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type CreateStateOutput = {
  __typename: 'CreateStateOutput';
  state: State;
};

export type CurrentUserInput = {
  _: InputMaybe<Scalars['String']['input']>;
};

export type CurrentUserOutput = {
  __typename: 'CurrentUserOutput';
  user: User;
};

export type DeliveryOrder = Order & {
  __typename: 'DeliveryOrder';
  addons: Array<OrderAddon>;
  client: OrderClient;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  discount: Scalars['Int']['output'];
  driver: Maybe<OrderDriver>;
  externalId: Maybe<Scalars['String']['output']>;
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
  __typename: 'DeliveryType';
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
  __typename: 'DeliveryTypeOutput';
  deliveryType: DeliveryType;
};

export type DeliveryTypesInput = {
  _: InputMaybe<Scalars['String']['input']>;
};

export type DeliveryTypesOutput = {
  __typename: 'DeliveryTypesOutput';
  deliveryTypes: Array<DeliveryType>;
};

export type DisableUserInput = {
  id: Scalars['UUID']['input'];
};

export type DisableUserOutput = {
  __typename: 'DisableUserOutput';
  _: Maybe<Scalars['String']['output']>;
};

export type DriverUser = IUser & {
  __typename: 'DriverUser';
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
  __typename: 'DriverUserOutput';
  driverUser: DriverUser;
};

export type DriverUsersInput = {
  pagination: InputMaybe<Pagination>;
  partnerId: InputMaybe<Scalars['UUID']['input']>;
  sorting: InputMaybe<Sorting>;
};

export type DriverUsersOutput = {
  __typename: 'DriverUsersOutput';
  driverUsers: Array<DriverUser>;
  total: Scalars['Int']['output'];
};

export type DropOffOrderInput = {
  id: Scalars['UUID']['input'];
};

export type DropOffOrderOutput = {
  __typename: 'DropOffOrderOutput';
  _: Maybe<Scalars['String']['output']>;
};

export type EnableUserInput = {
  id: Scalars['UUID']['input'];
};

export type EnableUserOutput = {
  __typename: 'EnableUserOutput';
  _: Maybe<Scalars['String']['output']>;
};

export enum FileType {
  DRIVER_LICENSE_BACK = 'DRIVER_LICENSE_BACK',
  DRIVER_LICENSE_FRONT = 'DRIVER_LICENSE_FRONT',
  DRIVER_PHOTO = 'DRIVER_PHOTO',
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
  __typename: 'Location';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  type: LocationType;
};

export enum LocationType {
  MUNICIPALITY = 'MUNICIPALITY',
  NEIGHBORHOOD = 'NEIGHBORHOOD',
  PROVINCE = 'PROVINCE',
}

export type MunicipalitiesInput = {
  provinceId: Scalars['UUID']['input'];
};

export type MunicipalitiesOutput = {
  __typename: 'MunicipalitiesOutput';
  municipalities: Array<Municipality>;
};

export type Municipality = {
  __typename: 'Municipality';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type MunicipalityInput = {
  id: Scalars['UUID']['input'];
};

export type MunicipalityOutput = {
  __typename: 'MunicipalityOutput';
  municipality: Municipality;
};

export type Mutation = {
  __typename: 'Mutation';
  _: Maybe<Scalars['String']['output']>;
  changePassword: ChangePasswordOutput;
  createArticle: CreateArticleOutput;
  createArticlePricingRule: CreateArticlePricingRuleOutput;
  createArticleVariant: CreateArticleVariantOutput;
  createCity: CreateCityOutput;
  createDeliveryType: CreateDeliveryTypeOutput;
  createDriverUser: CreateDriverUserOutput;
  createMunicipality: CreateMunicipalityOutput;
  createNeighborhood: CreateNeighborhoodOutput;
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
  __typename: 'Neighborhood';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type NeighborhoodInput = {
  id: Scalars['UUID']['input'];
};

export type NeighborhoodOutput = {
  __typename: 'NeighborhoodOutput';
  neighborhood: Neighborhood;
};

export type NeighborhoodsInput = {
  municipalityId: Scalars['UUID']['input'];
};

export type NeighborhoodsOutput = {
  __typename: 'NeighborhoodsOutput';
  neighborhoods: Array<Neighborhood>;
};

export type Order = {
  addons: Array<OrderAddon>;
  client: OrderClient;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  discount: Scalars['Int']['output'];
  driver: Maybe<OrderDriver>;
  externalId: Maybe<Scalars['String']['output']>;
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
  __typename: 'OrderArticle';
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
  __typename: 'OrderArticleVariant';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type OrderCard = IOrderPaymentMethod & {
  __typename: 'OrderCard';
  brand: Scalars['String']['output'];
  expMonth: Scalars['Int']['output'];
  expYear: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  last4: Scalars['String']['output'];
  type: PaymentMethodType;
};

export type OrderClient = {
  __typename: 'OrderClient';
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
};

export type OrderContentType = {
  __typename: 'OrderContentType';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type OrderDeliveryType = {
  __typename: 'OrderDeliveryType';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type OrderDriver = {
  __typename: 'OrderDriver';
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
  vehicle: OrderVehicle;
};

export type OrderHomePickupAddon = IOrderAddon & {
  __typename: 'OrderHomePickupAddon';
  date: Scalars['Date']['output'];
  freeThresholdAmount: Scalars['Int']['output'];
  hourRange: OrderHomePickupAddonHourRange;
  id: Scalars['UUID']['output'];
  price: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  type: AddonType;
};

export type OrderHomePickupAddonHourRange = {
  __typename: 'OrderHomePickupAddonHourRange';
  endAt: Scalars['String']['output'];
  startAt: Scalars['String']['output'];
};

export type OrderHomeWrappingAddon = IOrderAddon & {
  __typename: 'OrderHomeWrappingAddon';
  date: Scalars['Date']['output'];
  freeThresholdAmount: Scalars['Int']['output'];
  hourRange: OrderHomeWrappingAddonHourRange;
  id: Scalars['UUID']['output'];
  price: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  type: AddonType;
};

export type OrderHomeWrappingAddonHourRange = {
  __typename: 'OrderHomeWrappingAddonHourRange';
  endAt: Scalars['String']['output'];
  startAt: Scalars['String']['output'];
};

export type OrderInput = {
  id: Scalars['UUID']['input'];
};

export type OrderItem = {
  __typename: 'OrderItem';
  id: Scalars['UUID']['output'];
  product: OrderProduct;
  quantity: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type OrderLuggage = IOrderProduct & {
  __typename: 'OrderLuggage';
  price: Scalars['Int']['output'];
  size: OrderLuggageSize;
  type: OrderProductType;
};

export type OrderLuggageSize = {
  __typename: 'OrderLuggageSize';
  id: Scalars['UUID']['output'];
  price: Scalars['Int']['output'];
};

export type OrderOutput = {
  __typename: 'OrderOutput';
  order: Order;
};

export type OrderPartner = {
  __typename: 'OrderPartner';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type OrderPartnerBalance = IOrderPaymentMethod & {
  __typename: 'OrderPartnerBalance';
  id: Scalars['UUID']['output'];
  type: PaymentMethodType;
};

export type OrderPaymentMethod = OrderCard | OrderPartnerBalance;

export type OrderProduct = OrderArticle | OrderLuggage;

export enum OrderProductType {
  ARTICLE = 'ARTICLE',
  LUGGAGE = 'LUGGAGE',
  PACKAGE = 'PACKAGE',
}

export type OrderRecipient = {
  __typename: 'OrderRecipient';
  address: OrderRecipientAddress;
  email: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  identityCardNumber: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  notes: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
};

export type OrderRecipientAddress = {
  __typename: 'OrderRecipientAddress';
  coordinates: Maybe<AddressCoordinates>;
  line1: Scalars['String']['output'];
  line2: Maybe<Scalars['String']['output']>;
  municipality: Scalars['String']['output'];
  neighborhood: Maybe<Scalars['String']['output']>;
  postalCode: Scalars['String']['output'];
  province: Scalars['String']['output'];
};

export type OrderSender = {
  __typename: 'OrderSender';
  address: OrderSenderAddress;
  email: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type OrderSenderAddress = {
  __typename: 'OrderSenderAddress';
  city: Scalars['String']['output'];
  coordinates: AddressCoordinates;
  line1: Scalars['String']['output'];
  line2: Maybe<Scalars['String']['output']>;
  state: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export enum OrderStatus {
  ACCEPTED = 'ACCEPTED',
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  DROPPED_OFF = 'DROPPED_OFF',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  PICKED_UP = 'PICKED_UP',
  SHIPPED = 'SHIPPED',
}

export type OrderVehicle = {
  __typename: 'OrderVehicle';
  color: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  make: Scalars['String']['output'];
  model: Scalars['String']['output'];
  plate: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

export type OrdersInput = {
  clientId: InputMaybe<Scalars['UUID']['input']>;
  code: InputMaybe<Scalars['String']['input']>;
  driverId: InputMaybe<Scalars['UUID']['input']>;
  externalId: InputMaybe<Scalars['String']['input']>;
  pagination: InputMaybe<Pagination>;
  partnerId: InputMaybe<Scalars['UUID']['input']>;
  serviceType: InputMaybe<ServiceType>;
  sorting: InputMaybe<Sorting>;
  status: InputMaybe<OrderStatus>;
};

export type OrdersOutput = {
  __typename: 'OrdersOutput';
  orders: Array<Order>;
  total: Scalars['Int']['output'];
};

export type Pagination = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type Partner = {
  __typename: 'Partner';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PartnerInput = {
  id: Scalars['UUID']['input'];
};

export type PartnerOutput = {
  __typename: 'PartnerOutput';
  partner: Partner;
};

export type PartnerUser = IUser & {
  __typename: 'PartnerUser';
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
  _: InputMaybe<Scalars['String']['input']>;
};

export type PartnersOutput = {
  __typename: 'PartnersOutput';
  partners: Array<Partner>;
};

export enum PaymentMethodType {
  CARD = 'CARD',
  PARTNER_BALANCE = 'PARTNER_BALANCE',
}

export type PricingRule = ArticlePricingRule;

export type PricingRuleArticle = {
  __typename: 'PricingRuleArticle';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PricingRuleArticleVariant = {
  __typename: 'PricingRuleArticleVariant';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PricingRuleContentType = {
  __typename: 'PricingRuleContentType';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PricingRuleDeliveryType = {
  __typename: 'PricingRuleDeliveryType';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PricingRuleInput = {
  id: Scalars['UUID']['input'];
};

export type PricingRuleLocation = {
  __typename: 'PricingRuleLocation';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PricingRuleOutput = {
  __typename: 'PricingRuleOutput';
  pricingRule: PricingRule;
};

export type PricingRulePartner = {
  __typename: 'PricingRulePartner';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export enum PricingRuleType {
  ARTICLE = 'ARTICLE',
  PACKAGE = 'PACKAGE',
}

export type PricingRulesInput = {
  articleId: InputMaybe<Scalars['UUID']['input']>;
  articleVariantId: InputMaybe<Scalars['UUID']['input']>;
  contentTypeId: InputMaybe<Scalars['UUID']['input']>;
  deliveryTypeId: InputMaybe<Scalars['UUID']['input']>;
  isEnabled: InputMaybe<Scalars['Boolean']['input']>;
  locationId: InputMaybe<Scalars['UUID']['input']>;
  partnerId: InputMaybe<Scalars['UUID']['input']>;
  type: InputMaybe<PricingRuleType>;
};

export type PricingRulesOutput = {
  __typename: 'PricingRulesOutput';
  pricingRules: Array<PricingRule>;
};

export type Province = {
  __typename: 'Province';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type ProvinceInput = {
  id: Scalars['UUID']['input'];
};

export type ProvinceOutput = {
  __typename: 'ProvinceOutput';
  province: Province;
};

export type ProvincesInput = {
  countryId: Scalars['UUID']['input'];
};

export type ProvincesOutput = {
  __typename: 'ProvincesOutput';
  provinces: Array<Province>;
};

export type Query = {
  __typename: 'Query';
  _: Maybe<Scalars['String']['output']>;
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
  _: InputMaybe<Scalars['String']['input']>;
};

export type RefreshTokensOutput = {
  __typename: 'RefreshTokensOutput';
  tokens: Tokens;
};

export type SendEmailVerificationInput = {
  email: Scalars['String']['input'];
};

export type SendEmailVerificationOutput = {
  __typename: 'SendEmailVerificationOutput';
  _: Maybe<Scalars['String']['output']>;
};

export type SendPhoneVerificationInput = {
  phone: Scalars['String']['input'];
};

export type SendPhoneVerificationOutput = {
  __typename: 'SendPhoneVerificationOutput';
  _: Maybe<Scalars['String']['output']>;
};

export enum ServiceType {
  DELIVERY = 'DELIVERY',
  WRAPPING = 'WRAPPING',
}

export type SignInInput = {
  email: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone: InputMaybe<Scalars['String']['input']>;
};

export type SignInOutput = {
  __typename: 'SignInOutput';
  tokens: Tokens;
};

export type SignOutInput = {
  _: InputMaybe<Scalars['String']['input']>;
};

export type SignOutOutput = {
  __typename: 'SignOutOutput';
  _: Maybe<Scalars['String']['output']>;
};

export type Sorting = {
  field: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type StaffUser = IUser & {
  __typename: 'StaffUser';
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
  __typename: 'StaffUserOutput';
  staffUser: StaffUser;
};

export type StaffUsersInput = {
  pagination: InputMaybe<Pagination>;
  partnerId: InputMaybe<Scalars['UUID']['input']>;
  sorting: InputMaybe<Sorting>;
};

export type StaffUsersOutput = {
  __typename: 'StaffUsersOutput';
  staffUsers: Array<StaffUser>;
  total: Scalars['Int']['output'];
};

export type State = {
  __typename: 'State';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type StateInput = {
  id: Scalars['UUID']['input'];
};

export type StateOutput = {
  __typename: 'StateOutput';
  state: State;
};

export type StatesInput = {
  countryId: Scalars['UUID']['input'];
};

export type StatesOutput = {
  __typename: 'StatesOutput';
  states: Array<State>;
};

export type Tokens = {
  __typename: 'Tokens';
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
  __typename: 'UpdateArticleOutput';
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
  __typename: 'UpdateArticlePricingRuleOutput';
  articlePricingRule: ArticlePricingRule;
};

export type UpdateArticleVariantInput = {
  id: Scalars['UUID']['input'];
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type UpdateArticleVariantOutput = {
  __typename: 'UpdateArticleVariantOutput';
  articleVariant: ArticleVariant;
};

export type UpdateCityInput = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  stateId: Scalars['UUID']['input'];
  zipCodes: Array<Scalars['String']['input']>;
};

export type UpdateCityOutput = {
  __typename: 'UpdateCityOutput';
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
  __typename: 'UpdateDeliveryTypeOutput';
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
  __typename: 'UpdateDriverUserOutput';
  driverUser: DriverUser;
};

export type UpdateMunicipalityInput = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  provinceId: Scalars['UUID']['input'];
};

export type UpdateMunicipalityOutput = {
  __typename: 'UpdateMunicipalityOutput';
  municipality: Municipality;
};

export type UpdateNeighborhoodInput = {
  id: Scalars['UUID']['input'];
  municipalityId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateNeighborhoodOutput = {
  __typename: 'UpdateNeighborhoodOutput';
  neighborhood: Neighborhood;
};

export type UpdatePartnerUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type UpdatePartnerUserOutput = {
  __typename: 'UpdatePartnerUserOutput';
  partnerUser: PartnerUser;
};

export type UpdateProvinceInput = {
  countryId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateProvinceOutput = {
  __typename: 'UpdateProvinceOutput';
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
  __typename: 'UpdateStaffUserOutput';
  staffUser: StaffUser;
};

export type UpdateStateInput = {
  countryId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateStateOutput = {
  __typename: 'UpdateStateOutput';
  state: State;
};

export type User = {
  __typename: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type UserPartner = {
  __typename: 'UserPartner';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export enum UserType {
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
  PARTNER = 'PARTNER',
  STAFF = 'STAFF',
}

export type VerifyEmailInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type VerifyEmailOutput = {
  __typename: 'VerifyEmailOutput';
  tokens: Tokens;
};

export type VerifyPhoneInput = {
  code: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type VerifyPhoneOutput = {
  __typename: 'VerifyPhoneOutput';
  tokens: Tokens;
};

export type WrappingOrder = Order & {
  __typename: 'WrappingOrder';
  addons: Array<OrderAddon>;
  client: OrderClient;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  discount: Scalars['Int']['output'];
  driver: Maybe<OrderDriver>;
  externalId: Maybe<Scalars['String']['output']>;
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
  __typename: 'Mutation';
  signIn: {
    __typename: 'SignInOutput';
    tokens: { __typename: 'Tokens'; accessToken: string; refreshToken: string };
  };
};

export type SignOutMutationVariables = Exact<{
  input: SignOutInput;
}>;

export type SignOutMutation = {
  __typename: 'Mutation';
  signOut: { __typename: 'SignOutOutput'; _: string | null };
};

export type RefreshTokensMutationVariables = Exact<{
  input: RefreshTokensInput;
}>;

export type RefreshTokensMutation = {
  __typename: 'Mutation';
  refreshTokens: {
    __typename: 'RefreshTokensOutput';
    tokens: { __typename: 'Tokens'; accessToken: string; refreshToken: string };
  };
};

export type EnableUserMutationVariables = Exact<{
  input: EnableUserInput;
}>;

export type EnableUserMutation = {
  __typename: 'Mutation';
  enableUser: { __typename: 'EnableUserOutput'; _: string | null };
};

export type DisableUserMutationVariables = Exact<{
  input: DisableUserInput;
}>;

export type DisableUserMutation = {
  __typename: 'Mutation';
  disableUser: { __typename: 'DisableUserOutput'; _: string | null };
};

export type DropOffOrderMutationVariables = Exact<{
  input: DropOffOrderInput;
}>;

export type DropOffOrderMutation = {
  __typename: 'Mutation';
  dropOffOrder: { __typename: 'DropOffOrderOutput'; _: string | null };
};

export type CreateArticleMutationVariables = Exact<{
  input: CreateArticleInput;
}>;

export type CreateArticleMutation = {
  __typename: 'Mutation';
  createArticle: {
    __typename: 'CreateArticleOutput';
    article: {
      __typename: 'Article';
      id: string;
      name: string;
      description: string;
      imagePath: string;
      isEnabled: boolean;
    };
  };
};

export type UpdateArticleMutationVariables = Exact<{
  input: UpdateArticleInput;
}>;

export type UpdateArticleMutation = {
  __typename: 'Mutation';
  updateArticle: {
    __typename: 'UpdateArticleOutput';
    article: {
      __typename: 'Article';
      id: string;
      name: string;
      description: string;
      imagePath: string;
      isEnabled: boolean;
    };
  };
};

export type CreateDeliveryTypeMutationVariables = Exact<{
  input: CreateDeliveryTypeInput;
}>;

export type CreateDeliveryTypeMutation = {
  __typename: 'Mutation';
  createDeliveryType: {
    __typename: 'CreateDeliveryTypeOutput';
    deliveryType: {
      __typename: 'DeliveryType';
      id: string;
      name: string;
      description: string;
      isEnabled: boolean;
    };
  };
};

export type UpdateDeliveryTypeMutationVariables = Exact<{
  input: UpdateDeliveryTypeInput;
}>;

export type UpdateDeliveryTypeMutation = {
  __typename: 'Mutation';
  updateDeliveryType: {
    __typename: 'UpdateDeliveryTypeOutput';
    deliveryType: {
      __typename: 'DeliveryType';
      id: string;
      name: string;
      description: string;
      isEnabled: boolean;
    };
  };
};

export type CreateStateMutationVariables = Exact<{
  input: CreateStateInput;
}>;

export type CreateStateMutation = {
  __typename: 'Mutation';
  createState: {
    __typename: 'CreateStateOutput';
    state: { __typename: 'State'; id: string; name: string };
  };
};

export type UpdateStateMutationVariables = Exact<{
  input: UpdateStateInput;
}>;

export type UpdateStateMutation = {
  __typename: 'Mutation';
  updateState: {
    __typename: 'UpdateStateOutput';
    state: { __typename: 'State'; id: string; name: string };
  };
};

export type CreateCityMutationVariables = Exact<{
  input: CreateCityInput;
}>;

export type CreateCityMutation = {
  __typename: 'Mutation';
  createCity: {
    __typename: 'CreateCityOutput';
    city: {
      __typename: 'City';
      id: string;
      name: string;
      zipCodes: Array<string>;
    };
  };
};

export type UpdateCityMutationVariables = Exact<{
  input: UpdateCityInput;
}>;

export type UpdateCityMutation = {
  __typename: 'Mutation';
  updateCity: {
    __typename: 'UpdateCityOutput';
    city: {
      __typename: 'City';
      id: string;
      name: string;
      zipCodes: Array<string>;
    };
  };
};

export type CreateProvinceMutationVariables = Exact<{
  input: CreateProvinceInput;
}>;

export type CreateProvinceMutation = {
  __typename: 'Mutation';
  createProvince: {
    __typename: 'CreateProvinceOutput';
    province: { __typename: 'Province'; id: string; name: string };
  };
};

export type UpdateProvinceMutationVariables = Exact<{
  input: UpdateProvinceInput;
}>;

export type UpdateProvinceMutation = {
  __typename: 'Mutation';
  updateProvince: {
    __typename: 'UpdateProvinceOutput';
    province: { __typename: 'Province'; id: string; name: string };
  };
};

export type CreateMunicipalityMutationVariables = Exact<{
  input: CreateMunicipalityInput;
}>;

export type CreateMunicipalityMutation = {
  __typename: 'Mutation';
  createMunicipality: {
    __typename: 'CreateMunicipalityOutput';
    municipality: { __typename: 'Municipality'; id: string; name: string };
  };
};

export type UpdateMunicipalityMutationVariables = Exact<{
  input: UpdateMunicipalityInput;
}>;

export type UpdateMunicipalityMutation = {
  __typename: 'Mutation';
  updateMunicipality: {
    __typename: 'UpdateMunicipalityOutput';
    municipality: { __typename: 'Municipality'; id: string; name: string };
  };
};

export type CreateNeighborhoodMutationVariables = Exact<{
  input: CreateNeighborhoodInput;
}>;

export type CreateNeighborhoodMutation = {
  __typename: 'Mutation';
  createNeighborhood: {
    __typename: 'CreateNeighborhoodOutput';
    neighborhood: { __typename: 'Neighborhood'; id: string; name: string };
  };
};

export type UpdateNeighborhoodMutationVariables = Exact<{
  input: UpdateNeighborhoodInput;
}>;

export type UpdateNeighborhoodMutation = {
  __typename: 'Mutation';
  updateNeighborhood: {
    __typename: 'UpdateNeighborhoodOutput';
    neighborhood: { __typename: 'Neighborhood'; id: string; name: string };
  };
};

export type CreatePresignPutFileUrlMutationVariables = Exact<{
  input: CreatePresignPutFileUrlInput;
}>;

export type CreatePresignPutFileUrlMutation = {
  __typename: 'Mutation';
  createPresignPutFileUrl: {
    __typename: 'CreatePresignPutFileUrlOutput';
    url: string;
  };
};

export type ArticleFragmentFragment = {
  __typename: 'Article';
  id: string;
  name: string;
  description: string;
  imagePath: string;
  isEnabled: boolean;
};

export type ArticleVariantFragmentFragment = {
  __typename: 'ArticleVariant';
  id: string;
  name: string;
  isEnabled: boolean;
};

export type CountryFragmentFragment = {
  __typename: 'Country';
  id: string;
  name: string;
};

export type StateFragmentFragment = {
  __typename: 'State';
  id: string;
  name: string;
};

export type CityFragmentFragment = {
  __typename: 'City';
  id: string;
  name: string;
  zipCodes: Array<string>;
};

export type ProvinceFragmentFragment = {
  __typename: 'Province';
  id: string;
  name: string;
};

export type MunicipalityFragmentFragment = {
  __typename: 'Municipality';
  id: string;
  name: string;
};

export type NeighborhoodFragmentFragment = {
  __typename: 'Neighborhood';
  id: string;
  name: string;
};

export type DeliveryTypeFragmentFragment = {
  __typename: 'DeliveryType';
  id: string;
  name: string;
  icon: string;
  description: string;
  isEnabled: boolean;
};

export type PartnerFragmentFragment = {
  __typename: 'Partner';
  id: string;
  name: string;
};

export type UserFragmentFragment = {
  __typename: 'User';
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type CurrentUserQueryVariables = Exact<{
  input: CurrentUserInput;
}>;

export type CurrentUserQuery = {
  __typename: 'Query';
  currentUser: {
    __typename: 'CurrentUserOutput';
    user: {
      __typename: 'User';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  };
};

export type GetArticlesQueryVariables = Exact<{
  input: ArticlesInput;
}>;

export type GetArticlesQuery = {
  __typename: 'Query';
  articles: {
    __typename: 'ArticlesOutput';
    articles: Array<{
      __typename: 'Article';
      id: string;
      name: string;
      description: string;
      imagePath: string;
      isEnabled: boolean;
      variants: Array<{
        __typename: 'ArticleVariant';
        id: string;
        name: string;
        isEnabled: boolean;
      }>;
    }>;
  };
};

export type GetArticleQueryVariables = Exact<{
  input: ArticleInput;
}>;

export type GetArticleQuery = {
  __typename: 'Query';
  article: {
    __typename: 'ArticleOutput';
    article: {
      __typename: 'Article';
      id: string;
      name: string;
      description: string;
      imagePath: string;
      isEnabled: boolean;
      variants: Array<{
        __typename: 'ArticleVariant';
        id: string;
        name: string;
        isEnabled: boolean;
      }>;
    };
  };
};

export type GetDeliveryTypesQueryVariables = Exact<{
  input: DeliveryTypesInput;
}>;

export type GetDeliveryTypesQuery = {
  __typename: 'Query';
  deliveryTypes: {
    __typename: 'DeliveryTypesOutput';
    deliveryTypes: Array<{
      __typename: 'DeliveryType';
      id: string;
      name: string;
      icon: string;
      description: string;
      isEnabled: boolean;
    }>;
  };
};

export type GetDeliveryTypeQueryVariables = Exact<{
  input: DeliveryTypeInput;
}>;

export type GetDeliveryTypeQuery = {
  __typename: 'Query';
  deliveryType: {
    __typename: 'DeliveryTypeOutput';
    deliveryType: {
      __typename: 'DeliveryType';
      id: string;
      name: string;
      icon: string;
      description: string;
      isEnabled: boolean;
    };
  };
};

export type GetCountriesQueryVariables = Exact<{
  input: CountriesInput;
}>;

export type GetCountriesQuery = {
  __typename: 'Query';
  countries: {
    __typename: 'CountriesOutput';
    countries: Array<{ __typename: 'Country'; id: string; name: string }>;
  };
};

export type GetCountryQueryVariables = Exact<{
  input: CountryInput;
}>;

export type GetCountryQuery = {
  __typename: 'Query';
  country: {
    __typename: 'CountryOutput';
    country: { __typename: 'Country'; id: string; name: string };
  };
};

export type GetStatesQueryVariables = Exact<{
  input: StatesInput;
}>;

export type GetStatesQuery = {
  __typename: 'Query';
  states: {
    __typename: 'StatesOutput';
    states: Array<{ __typename: 'State'; id: string; name: string }>;
  };
};

export type GetStateQueryVariables = Exact<{
  input: StateInput;
}>;

export type GetStateQuery = {
  __typename: 'Query';
  state: {
    __typename: 'StateOutput';
    state: { __typename: 'State'; id: string; name: string };
  };
};

export type GetCitiesQueryVariables = Exact<{
  input: CitiesInput;
}>;

export type GetCitiesQuery = {
  __typename: 'Query';
  cities: {
    __typename: 'CitiesOutput';
    cities: Array<{
      __typename: 'City';
      id: string;
      name: string;
      zipCodes: Array<string>;
    }>;
  };
};

export type GetCityQueryVariables = Exact<{
  input: CityInput;
}>;

export type GetCityQuery = {
  __typename: 'Query';
  city: {
    __typename: 'CityOutput';
    city: {
      __typename: 'City';
      id: string;
      name: string;
      zipCodes: Array<string>;
    };
  };
};

export type GetProvincesQueryVariables = Exact<{
  input: ProvincesInput;
}>;

export type GetProvincesQuery = {
  __typename: 'Query';
  provinces: {
    __typename: 'ProvincesOutput';
    provinces: Array<{ __typename: 'Province'; id: string; name: string }>;
  };
};

export type GetProvinceQueryVariables = Exact<{
  input: ProvinceInput;
}>;

export type GetProvinceQuery = {
  __typename: 'Query';
  province: {
    __typename: 'ProvinceOutput';
    province: { __typename: 'Province'; id: string; name: string };
  };
};

export type GetMunicipalitiesQueryVariables = Exact<{
  input: MunicipalitiesInput;
}>;

export type GetMunicipalitiesQuery = {
  __typename: 'Query';
  municipalities: {
    __typename: 'MunicipalitiesOutput';
    municipalities: Array<{
      __typename: 'Municipality';
      id: string;
      name: string;
    }>;
  };
};

export type GetMunicipalityQueryVariables = Exact<{
  input: MunicipalityInput;
}>;

export type GetMunicipalityQuery = {
  __typename: 'Query';
  municipality: {
    __typename: 'MunicipalityOutput';
    municipality: { __typename: 'Municipality'; id: string; name: string };
  };
};

export type GetNeighborhoodsQueryVariables = Exact<{
  input: NeighborhoodsInput;
}>;

export type GetNeighborhoodsQuery = {
  __typename: 'Query';
  neighborhoods: {
    __typename: 'NeighborhoodsOutput';
    neighborhoods: Array<{
      __typename: 'Neighborhood';
      id: string;
      name: string;
    }>;
  };
};

export type GetNeighborhoodQueryVariables = Exact<{
  input: NeighborhoodInput;
}>;

export type GetNeighborhoodQuery = {
  __typename: 'Query';
  neighborhood: {
    __typename: 'NeighborhoodOutput';
    neighborhood: { __typename: 'Neighborhood'; id: string; name: string };
  };
};

export type GetOrdersQueryVariables = Exact<{
  input: OrdersInput;
}>;

export type GetOrdersQuery = {
  __typename: 'Query';
  orders: {
    __typename: 'OrdersOutput';
    orders: Array<
      | {
          __typename: 'DeliveryOrder';
          id: string;
          status: OrderStatus;
          serviceType: ServiceType;
        }
      | {
          __typename: 'WrappingOrder';
          id: string;
          status: OrderStatus;
          serviceType: ServiceType;
        }
    >;
  };
};

export type GetOrderQueryVariables = Exact<{
  input: OrderInput;
}>;

export type GetOrderQuery = {
  __typename: 'Query';
  order: {
    __typename: 'OrderOutput';
    order:
      | {
          __typename: 'DeliveryOrder';
          id: string;
          status: OrderStatus;
          serviceType: ServiceType;
        }
      | {
          __typename: 'WrappingOrder';
          id: string;
          status: OrderStatus;
          serviceType: ServiceType;
        };
  };
};

export type GetPartnersQueryVariables = Exact<{
  input: PartnersInput;
}>;

export type GetPartnersQuery = {
  __typename: 'Query';
  partners: {
    __typename: 'PartnersOutput';
    partners: Array<{ __typename: 'Partner'; id: string; name: string }>;
  };
};

export type GetPartnerQueryVariables = Exact<{
  input: PartnerInput;
}>;

export type GetPartnerQuery = {
  __typename: 'Query';
  partner: {
    __typename: 'PartnerOutput';
    partner: { __typename: 'Partner'; id: string; name: string };
  };
};

export type GetPricingRulesQueryVariables = Exact<{
  input: PricingRulesInput;
}>;

export type GetPricingRulesQuery = {
  __typename: 'Query';
  pricingRules: {
    __typename: 'PricingRulesOutput';
    pricingRules: Array<{
      __typename: 'ArticlePricingRule';
      id: string;
      type: PricingRuleType;
      isEnabled: boolean;
    }>;
  };
};

export type GetPricingRuleQueryVariables = Exact<{
  input: PricingRuleInput;
}>;

export type GetPricingRuleQuery = {
  __typename: 'Query';
  pricingRule: {
    __typename: 'PricingRuleOutput';
    pricingRule: {
      __typename: 'ArticlePricingRule';
      id: string;
      type: PricingRuleType;
      isEnabled: boolean;
    };
  };
};

export const ArticleFragmentFragmentDoc = gql`
  fragment ArticleFragment on Article {
    id
    name
    description
    imagePath
    isEnabled
  }
`;
export const ArticleVariantFragmentFragmentDoc = gql`
  fragment ArticleVariantFragment on ArticleVariant {
    id
    name
    isEnabled
  }
`;
export const CountryFragmentFragmentDoc = gql`
  fragment CountryFragment on Country {
    id
    name
  }
`;
export const StateFragmentFragmentDoc = gql`
  fragment StateFragment on State {
    id
    name
  }
`;
export const CityFragmentFragmentDoc = gql`
  fragment CityFragment on City {
    id
    name
    zipCodes
  }
`;
export const ProvinceFragmentFragmentDoc = gql`
  fragment ProvinceFragment on Province {
    id
    name
  }
`;
export const MunicipalityFragmentFragmentDoc = gql`
  fragment MunicipalityFragment on Municipality {
    id
    name
  }
`;
export const NeighborhoodFragmentFragmentDoc = gql`
  fragment NeighborhoodFragment on Neighborhood {
    id
    name
  }
`;
export const DeliveryTypeFragmentFragmentDoc = gql`
  fragment DeliveryTypeFragment on DeliveryType {
    id
    name
    icon
    description
    isEnabled
  }
`;
export const PartnerFragmentFragmentDoc = gql`
  fragment PartnerFragment on Partner {
    id
    name
  }
`;
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
    phone
  }
`;
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignOutMutation,
    SignOutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    SignOutMutation,
    SignOutMutationVariables
  >(SignOutDocument, options);
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RefreshTokensMutation,
    RefreshTokensMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EnableUserMutation,
    EnableUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    EnableUserMutation,
    EnableUserMutationVariables
  >(EnableUserDocument, options);
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DisableUserMutation,
    DisableUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    DisableUserMutation,
    DisableUserMutationVariables
  >(DisableUserDocument, options);
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DropOffOrderMutation,
    DropOffOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateArticleMutation,
    CreateArticleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateArticleMutation,
    UpdateArticleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
export const CreateDeliveryTypeDocument = gql`
  mutation CreateDeliveryType($input: CreateDeliveryTypeInput!) {
    createDeliveryType(input: $input) {
      deliveryType {
        id
        name
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateDeliveryTypeMutation,
    CreateDeliveryTypeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateDeliveryTypeMutation,
    UpdateDeliveryTypeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateStateMutation,
    CreateStateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateStateMutation,
    CreateStateMutationVariables
  >(CreateStateDocument, options);
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateStateMutation,
    UpdateStateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateStateMutation,
    UpdateStateMutationVariables
  >(UpdateStateDocument, options);
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateCityMutation,
    CreateCityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateCityMutation,
    CreateCityMutationVariables
  >(CreateCityDocument, options);
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateCityMutation,
    UpdateCityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateCityMutation,
    UpdateCityMutationVariables
  >(UpdateCityDocument, options);
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateProvinceMutation,
    CreateProvinceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateProvinceMutation,
    UpdateProvinceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateMunicipalityMutation,
    CreateMunicipalityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateMunicipalityMutation,
    UpdateMunicipalityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateNeighborhoodMutation,
    CreateNeighborhoodMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateNeighborhoodMutation,
    UpdateNeighborhoodMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePresignPutFileUrlMutation,
    CreatePresignPutFileUrlMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
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
  query CurrentUser($input: CurrentUserInput!) {
    currentUser(input: $input) {
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  > &
    (
      | { variables: CurrentUserQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >(CurrentUserDocument, options);
}
export function useCurrentUserSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        CurrentUserQuery,
        CurrentUserQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >(CurrentUserDocument, options);
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>;
export type CurrentUserSuspenseQueryHookResult = ReturnType<
  typeof useCurrentUserSuspenseQuery
>;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
export const GetArticlesDocument = gql`
  query GetArticles($input: ArticlesInput!) {
    articles(input: $input) {
      articles {
        ...ArticleFragment
        variants {
          ...ArticleVariantFragment
        }
      }
    }
  }
  ${ArticleFragmentFragmentDoc}
  ${ArticleVariantFragmentFragmentDoc}
`;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetArticlesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetArticlesQuery,
    GetArticlesQueryVariables
  > &
    (
      | { variables: GetArticlesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(
    GetArticlesDocument,
    options
  );
}
export function useGetArticlesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetArticlesQuery,
    GetArticlesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetArticlesQuery,
    GetArticlesQueryVariables
  >(GetArticlesDocument, options);
}
export function useGetArticlesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetArticlesQuery,
        GetArticlesQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetArticlesQuery,
    GetArticlesQueryVariables
  >(GetArticlesDocument, options);
}
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<
  typeof useGetArticlesLazyQuery
>;
export type GetArticlesSuspenseQueryHookResult = ReturnType<
  typeof useGetArticlesSuspenseQuery
>;
export type GetArticlesQueryResult = Apollo.QueryResult<
  GetArticlesQuery,
  GetArticlesQueryVariables
>;
export const GetArticleDocument = gql`
  query GetArticle($input: ArticleInput!) {
    article(input: $input) {
      article {
        ...ArticleFragment
        variants {
          ...ArticleVariantFragment
        }
      }
    }
  }
  ${ArticleFragmentFragmentDoc}
  ${ArticleVariantFragmentFragmentDoc}
`;

/**
 * __useGetArticleQuery__
 *
 * To run a query within a React component, call `useGetArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetArticleQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetArticleQuery,
    GetArticleQueryVariables
  > &
    (
      | { variables: GetArticleQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetArticleQuery, GetArticleQueryVariables>(
    GetArticleDocument,
    options
  );
}
export function useGetArticleLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetArticleQuery,
    GetArticleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetArticleQuery,
    GetArticleQueryVariables
  >(GetArticleDocument, options);
}
export function useGetArticleSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetArticleQuery,
        GetArticleQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetArticleQuery,
    GetArticleQueryVariables
  >(GetArticleDocument, options);
}
export type GetArticleQueryHookResult = ReturnType<typeof useGetArticleQuery>;
export type GetArticleLazyQueryHookResult = ReturnType<
  typeof useGetArticleLazyQuery
>;
export type GetArticleSuspenseQueryHookResult = ReturnType<
  typeof useGetArticleSuspenseQuery
>;
export type GetArticleQueryResult = Apollo.QueryResult<
  GetArticleQuery,
  GetArticleQueryVariables
>;
export const GetDeliveryTypesDocument = gql`
  query GetDeliveryTypes($input: DeliveryTypesInput!) {
    deliveryTypes(input: $input) {
      deliveryTypes {
        ...DeliveryTypeFragment
      }
    }
  }
  ${DeliveryTypeFragmentFragmentDoc}
`;

/**
 * __useGetDeliveryTypesQuery__
 *
 * To run a query within a React component, call `useGetDeliveryTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeliveryTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeliveryTypesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetDeliveryTypesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetDeliveryTypesQuery,
    GetDeliveryTypesQueryVariables
  > &
    (
      | { variables: GetDeliveryTypesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetDeliveryTypesQuery,
    GetDeliveryTypesQueryVariables
  >(GetDeliveryTypesDocument, options);
}
export function useGetDeliveryTypesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDeliveryTypesQuery,
    GetDeliveryTypesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetDeliveryTypesQuery,
    GetDeliveryTypesQueryVariables
  >(GetDeliveryTypesDocument, options);
}
export function useGetDeliveryTypesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetDeliveryTypesQuery,
        GetDeliveryTypesQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetDeliveryTypesQuery,
    GetDeliveryTypesQueryVariables
  >(GetDeliveryTypesDocument, options);
}
export type GetDeliveryTypesQueryHookResult = ReturnType<
  typeof useGetDeliveryTypesQuery
>;
export type GetDeliveryTypesLazyQueryHookResult = ReturnType<
  typeof useGetDeliveryTypesLazyQuery
>;
export type GetDeliveryTypesSuspenseQueryHookResult = ReturnType<
  typeof useGetDeliveryTypesSuspenseQuery
>;
export type GetDeliveryTypesQueryResult = Apollo.QueryResult<
  GetDeliveryTypesQuery,
  GetDeliveryTypesQueryVariables
>;
export const GetDeliveryTypeDocument = gql`
  query GetDeliveryType($input: DeliveryTypeInput!) {
    deliveryType(input: $input) {
      deliveryType {
        ...DeliveryTypeFragment
      }
    }
  }
  ${DeliveryTypeFragmentFragmentDoc}
`;

/**
 * __useGetDeliveryTypeQuery__
 *
 * To run a query within a React component, call `useGetDeliveryTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeliveryTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeliveryTypeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetDeliveryTypeQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetDeliveryTypeQuery,
    GetDeliveryTypeQueryVariables
  > &
    (
      | { variables: GetDeliveryTypeQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetDeliveryTypeQuery,
    GetDeliveryTypeQueryVariables
  >(GetDeliveryTypeDocument, options);
}
export function useGetDeliveryTypeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDeliveryTypeQuery,
    GetDeliveryTypeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetDeliveryTypeQuery,
    GetDeliveryTypeQueryVariables
  >(GetDeliveryTypeDocument, options);
}
export function useGetDeliveryTypeSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetDeliveryTypeQuery,
        GetDeliveryTypeQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetDeliveryTypeQuery,
    GetDeliveryTypeQueryVariables
  >(GetDeliveryTypeDocument, options);
}
export type GetDeliveryTypeQueryHookResult = ReturnType<
  typeof useGetDeliveryTypeQuery
>;
export type GetDeliveryTypeLazyQueryHookResult = ReturnType<
  typeof useGetDeliveryTypeLazyQuery
>;
export type GetDeliveryTypeSuspenseQueryHookResult = ReturnType<
  typeof useGetDeliveryTypeSuspenseQuery
>;
export type GetDeliveryTypeQueryResult = Apollo.QueryResult<
  GetDeliveryTypeQuery,
  GetDeliveryTypeQueryVariables
>;
export const GetCountriesDocument = gql`
  query GetCountries($input: CountriesInput!) {
    countries(input: $input) {
      countries {
        ...CountryFragment
      }
    }
  }
  ${CountryFragmentFragmentDoc}
`;

/**
 * __useGetCountriesQuery__
 *
 * To run a query within a React component, call `useGetCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCountriesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetCountriesQuery,
    GetCountriesQueryVariables
  > &
    (
      | { variables: GetCountriesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetCountriesQuery,
    GetCountriesQueryVariables
  >(GetCountriesDocument, options);
}
export function useGetCountriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCountriesQuery,
    GetCountriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetCountriesQuery,
    GetCountriesQueryVariables
  >(GetCountriesDocument, options);
}
export function useGetCountriesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetCountriesQuery,
        GetCountriesQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetCountriesQuery,
    GetCountriesQueryVariables
  >(GetCountriesDocument, options);
}
export type GetCountriesQueryHookResult = ReturnType<
  typeof useGetCountriesQuery
>;
export type GetCountriesLazyQueryHookResult = ReturnType<
  typeof useGetCountriesLazyQuery
>;
export type GetCountriesSuspenseQueryHookResult = ReturnType<
  typeof useGetCountriesSuspenseQuery
>;
export type GetCountriesQueryResult = Apollo.QueryResult<
  GetCountriesQuery,
  GetCountriesQueryVariables
>;
export const GetCountryDocument = gql`
  query GetCountry($input: CountryInput!) {
    country(input: $input) {
      country {
        ...CountryFragment
      }
    }
  }
  ${CountryFragmentFragmentDoc}
`;

/**
 * __useGetCountryQuery__
 *
 * To run a query within a React component, call `useGetCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCountryQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetCountryQuery,
    GetCountryQueryVariables
  > &
    (
      | { variables: GetCountryQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetCountryQuery, GetCountryQueryVariables>(
    GetCountryDocument,
    options
  );
}
export function useGetCountryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCountryQuery,
    GetCountryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetCountryQuery,
    GetCountryQueryVariables
  >(GetCountryDocument, options);
}
export function useGetCountrySuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetCountryQuery,
        GetCountryQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetCountryQuery,
    GetCountryQueryVariables
  >(GetCountryDocument, options);
}
export type GetCountryQueryHookResult = ReturnType<typeof useGetCountryQuery>;
export type GetCountryLazyQueryHookResult = ReturnType<
  typeof useGetCountryLazyQuery
>;
export type GetCountrySuspenseQueryHookResult = ReturnType<
  typeof useGetCountrySuspenseQuery
>;
export type GetCountryQueryResult = Apollo.QueryResult<
  GetCountryQuery,
  GetCountryQueryVariables
>;
export const GetStatesDocument = gql`
  query GetStates($input: StatesInput!) {
    states(input: $input) {
      states {
        ...StateFragment
      }
    }
  }
  ${StateFragmentFragmentDoc}
`;

/**
 * __useGetStatesQuery__
 *
 * To run a query within a React component, call `useGetStatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetStatesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetStatesQuery,
    GetStatesQueryVariables
  > &
    ({ variables: GetStatesQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetStatesQuery, GetStatesQueryVariables>(
    GetStatesDocument,
    options
  );
}
export function useGetStatesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetStatesQuery,
    GetStatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetStatesQuery, GetStatesQueryVariables>(
    GetStatesDocument,
    options
  );
}
export function useGetStatesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetStatesQuery,
        GetStatesQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetStatesQuery,
    GetStatesQueryVariables
  >(GetStatesDocument, options);
}
export type GetStatesQueryHookResult = ReturnType<typeof useGetStatesQuery>;
export type GetStatesLazyQueryHookResult = ReturnType<
  typeof useGetStatesLazyQuery
>;
export type GetStatesSuspenseQueryHookResult = ReturnType<
  typeof useGetStatesSuspenseQuery
>;
export type GetStatesQueryResult = Apollo.QueryResult<
  GetStatesQuery,
  GetStatesQueryVariables
>;
export const GetStateDocument = gql`
  query GetState($input: StateInput!) {
    state(input: $input) {
      state {
        ...StateFragment
      }
    }
  }
  ${StateFragmentFragmentDoc}
`;

/**
 * __useGetStateQuery__
 *
 * To run a query within a React component, call `useGetStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStateQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetStateQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetStateQuery,
    GetStateQueryVariables
  > &
    ({ variables: GetStateQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetStateQuery, GetStateQueryVariables>(
    GetStateDocument,
    options
  );
}
export function useGetStateLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetStateQuery,
    GetStateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetStateQuery, GetStateQueryVariables>(
    GetStateDocument,
    options
  );
}
export function useGetStateSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetStateQuery,
        GetStateQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetStateQuery,
    GetStateQueryVariables
  >(GetStateDocument, options);
}
export type GetStateQueryHookResult = ReturnType<typeof useGetStateQuery>;
export type GetStateLazyQueryHookResult = ReturnType<
  typeof useGetStateLazyQuery
>;
export type GetStateSuspenseQueryHookResult = ReturnType<
  typeof useGetStateSuspenseQuery
>;
export type GetStateQueryResult = Apollo.QueryResult<
  GetStateQuery,
  GetStateQueryVariables
>;
export const GetCitiesDocument = gql`
  query GetCities($input: CitiesInput!) {
    cities(input: $input) {
      cities {
        ...CityFragment
      }
    }
  }
  ${CityFragmentFragmentDoc}
`;

/**
 * __useGetCitiesQuery__
 *
 * To run a query within a React component, call `useGetCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCitiesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetCitiesQuery,
    GetCitiesQueryVariables
  > &
    ({ variables: GetCitiesQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetCitiesQuery, GetCitiesQueryVariables>(
    GetCitiesDocument,
    options
  );
}
export function useGetCitiesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCitiesQuery,
    GetCitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetCitiesQuery, GetCitiesQueryVariables>(
    GetCitiesDocument,
    options
  );
}
export function useGetCitiesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetCitiesQuery,
        GetCitiesQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetCitiesQuery,
    GetCitiesQueryVariables
  >(GetCitiesDocument, options);
}
export type GetCitiesQueryHookResult = ReturnType<typeof useGetCitiesQuery>;
export type GetCitiesLazyQueryHookResult = ReturnType<
  typeof useGetCitiesLazyQuery
>;
export type GetCitiesSuspenseQueryHookResult = ReturnType<
  typeof useGetCitiesSuspenseQuery
>;
export type GetCitiesQueryResult = Apollo.QueryResult<
  GetCitiesQuery,
  GetCitiesQueryVariables
>;
export const GetCityDocument = gql`
  query GetCity($input: CityInput!) {
    city(input: $input) {
      city {
        ...CityFragment
      }
    }
  }
  ${CityFragmentFragmentDoc}
`;

/**
 * __useGetCityQuery__
 *
 * To run a query within a React component, call `useGetCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCityQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCityQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetCityQuery,
    GetCityQueryVariables
  > &
    ({ variables: GetCityQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetCityQuery, GetCityQueryVariables>(
    GetCityDocument,
    options
  );
}
export function useGetCityLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCityQuery,
    GetCityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetCityQuery, GetCityQueryVariables>(
    GetCityDocument,
    options
  );
}
export function useGetCitySuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetCityQuery,
        GetCityQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<GetCityQuery, GetCityQueryVariables>(
    GetCityDocument,
    options
  );
}
export type GetCityQueryHookResult = ReturnType<typeof useGetCityQuery>;
export type GetCityLazyQueryHookResult = ReturnType<typeof useGetCityLazyQuery>;
export type GetCitySuspenseQueryHookResult = ReturnType<
  typeof useGetCitySuspenseQuery
>;
export type GetCityQueryResult = Apollo.QueryResult<
  GetCityQuery,
  GetCityQueryVariables
>;
export const GetProvincesDocument = gql`
  query GetProvinces($input: ProvincesInput!) {
    provinces(input: $input) {
      provinces {
        ...ProvinceFragment
      }
    }
  }
  ${ProvinceFragmentFragmentDoc}
`;

/**
 * __useGetProvincesQuery__
 *
 * To run a query within a React component, call `useGetProvincesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProvincesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProvincesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProvincesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetProvincesQuery,
    GetProvincesQueryVariables
  > &
    (
      | { variables: GetProvincesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetProvincesQuery,
    GetProvincesQueryVariables
  >(GetProvincesDocument, options);
}
export function useGetProvincesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProvincesQuery,
    GetProvincesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetProvincesQuery,
    GetProvincesQueryVariables
  >(GetProvincesDocument, options);
}
export function useGetProvincesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetProvincesQuery,
        GetProvincesQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetProvincesQuery,
    GetProvincesQueryVariables
  >(GetProvincesDocument, options);
}
export type GetProvincesQueryHookResult = ReturnType<
  typeof useGetProvincesQuery
>;
export type GetProvincesLazyQueryHookResult = ReturnType<
  typeof useGetProvincesLazyQuery
>;
export type GetProvincesSuspenseQueryHookResult = ReturnType<
  typeof useGetProvincesSuspenseQuery
>;
export type GetProvincesQueryResult = Apollo.QueryResult<
  GetProvincesQuery,
  GetProvincesQueryVariables
>;
export const GetProvinceDocument = gql`
  query GetProvince($input: ProvinceInput!) {
    province(input: $input) {
      province {
        ...ProvinceFragment
      }
    }
  }
  ${ProvinceFragmentFragmentDoc}
`;

/**
 * __useGetProvinceQuery__
 *
 * To run a query within a React component, call `useGetProvinceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProvinceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProvinceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProvinceQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetProvinceQuery,
    GetProvinceQueryVariables
  > &
    (
      | { variables: GetProvinceQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetProvinceQuery, GetProvinceQueryVariables>(
    GetProvinceDocument,
    options
  );
}
export function useGetProvinceLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProvinceQuery,
    GetProvinceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetProvinceQuery,
    GetProvinceQueryVariables
  >(GetProvinceDocument, options);
}
export function useGetProvinceSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetProvinceQuery,
        GetProvinceQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetProvinceQuery,
    GetProvinceQueryVariables
  >(GetProvinceDocument, options);
}
export type GetProvinceQueryHookResult = ReturnType<typeof useGetProvinceQuery>;
export type GetProvinceLazyQueryHookResult = ReturnType<
  typeof useGetProvinceLazyQuery
>;
export type GetProvinceSuspenseQueryHookResult = ReturnType<
  typeof useGetProvinceSuspenseQuery
>;
export type GetProvinceQueryResult = Apollo.QueryResult<
  GetProvinceQuery,
  GetProvinceQueryVariables
>;
export const GetMunicipalitiesDocument = gql`
  query GetMunicipalities($input: MunicipalitiesInput!) {
    municipalities(input: $input) {
      municipalities {
        ...MunicipalityFragment
      }
    }
  }
  ${MunicipalityFragmentFragmentDoc}
`;

/**
 * __useGetMunicipalitiesQuery__
 *
 * To run a query within a React component, call `useGetMunicipalitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMunicipalitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMunicipalitiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMunicipalitiesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetMunicipalitiesQuery,
    GetMunicipalitiesQueryVariables
  > &
    (
      | { variables: GetMunicipalitiesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetMunicipalitiesQuery,
    GetMunicipalitiesQueryVariables
  >(GetMunicipalitiesDocument, options);
}
export function useGetMunicipalitiesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMunicipalitiesQuery,
    GetMunicipalitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetMunicipalitiesQuery,
    GetMunicipalitiesQueryVariables
  >(GetMunicipalitiesDocument, options);
}
export function useGetMunicipalitiesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetMunicipalitiesQuery,
        GetMunicipalitiesQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetMunicipalitiesQuery,
    GetMunicipalitiesQueryVariables
  >(GetMunicipalitiesDocument, options);
}
export type GetMunicipalitiesQueryHookResult = ReturnType<
  typeof useGetMunicipalitiesQuery
>;
export type GetMunicipalitiesLazyQueryHookResult = ReturnType<
  typeof useGetMunicipalitiesLazyQuery
>;
export type GetMunicipalitiesSuspenseQueryHookResult = ReturnType<
  typeof useGetMunicipalitiesSuspenseQuery
>;
export type GetMunicipalitiesQueryResult = Apollo.QueryResult<
  GetMunicipalitiesQuery,
  GetMunicipalitiesQueryVariables
>;
export const GetMunicipalityDocument = gql`
  query GetMunicipality($input: MunicipalityInput!) {
    municipality(input: $input) {
      municipality {
        ...MunicipalityFragment
      }
    }
  }
  ${MunicipalityFragmentFragmentDoc}
`;

/**
 * __useGetMunicipalityQuery__
 *
 * To run a query within a React component, call `useGetMunicipalityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMunicipalityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMunicipalityQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMunicipalityQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetMunicipalityQuery,
    GetMunicipalityQueryVariables
  > &
    (
      | { variables: GetMunicipalityQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetMunicipalityQuery,
    GetMunicipalityQueryVariables
  >(GetMunicipalityDocument, options);
}
export function useGetMunicipalityLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMunicipalityQuery,
    GetMunicipalityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetMunicipalityQuery,
    GetMunicipalityQueryVariables
  >(GetMunicipalityDocument, options);
}
export function useGetMunicipalitySuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetMunicipalityQuery,
        GetMunicipalityQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetMunicipalityQuery,
    GetMunicipalityQueryVariables
  >(GetMunicipalityDocument, options);
}
export type GetMunicipalityQueryHookResult = ReturnType<
  typeof useGetMunicipalityQuery
>;
export type GetMunicipalityLazyQueryHookResult = ReturnType<
  typeof useGetMunicipalityLazyQuery
>;
export type GetMunicipalitySuspenseQueryHookResult = ReturnType<
  typeof useGetMunicipalitySuspenseQuery
>;
export type GetMunicipalityQueryResult = Apollo.QueryResult<
  GetMunicipalityQuery,
  GetMunicipalityQueryVariables
>;
export const GetNeighborhoodsDocument = gql`
  query GetNeighborhoods($input: NeighborhoodsInput!) {
    neighborhoods(input: $input) {
      neighborhoods {
        ...NeighborhoodFragment
      }
    }
  }
  ${NeighborhoodFragmentFragmentDoc}
`;

/**
 * __useGetNeighborhoodsQuery__
 *
 * To run a query within a React component, call `useGetNeighborhoodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNeighborhoodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNeighborhoodsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetNeighborhoodsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetNeighborhoodsQuery,
    GetNeighborhoodsQueryVariables
  > &
    (
      | { variables: GetNeighborhoodsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetNeighborhoodsQuery,
    GetNeighborhoodsQueryVariables
  >(GetNeighborhoodsDocument, options);
}
export function useGetNeighborhoodsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetNeighborhoodsQuery,
    GetNeighborhoodsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetNeighborhoodsQuery,
    GetNeighborhoodsQueryVariables
  >(GetNeighborhoodsDocument, options);
}
export function useGetNeighborhoodsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetNeighborhoodsQuery,
        GetNeighborhoodsQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetNeighborhoodsQuery,
    GetNeighborhoodsQueryVariables
  >(GetNeighborhoodsDocument, options);
}
export type GetNeighborhoodsQueryHookResult = ReturnType<
  typeof useGetNeighborhoodsQuery
>;
export type GetNeighborhoodsLazyQueryHookResult = ReturnType<
  typeof useGetNeighborhoodsLazyQuery
>;
export type GetNeighborhoodsSuspenseQueryHookResult = ReturnType<
  typeof useGetNeighborhoodsSuspenseQuery
>;
export type GetNeighborhoodsQueryResult = Apollo.QueryResult<
  GetNeighborhoodsQuery,
  GetNeighborhoodsQueryVariables
>;
export const GetNeighborhoodDocument = gql`
  query GetNeighborhood($input: NeighborhoodInput!) {
    neighborhood(input: $input) {
      neighborhood {
        ...NeighborhoodFragment
      }
    }
  }
  ${NeighborhoodFragmentFragmentDoc}
`;

/**
 * __useGetNeighborhoodQuery__
 *
 * To run a query within a React component, call `useGetNeighborhoodQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNeighborhoodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNeighborhoodQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetNeighborhoodQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetNeighborhoodQuery,
    GetNeighborhoodQueryVariables
  > &
    (
      | { variables: GetNeighborhoodQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetNeighborhoodQuery,
    GetNeighborhoodQueryVariables
  >(GetNeighborhoodDocument, options);
}
export function useGetNeighborhoodLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetNeighborhoodQuery,
    GetNeighborhoodQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetNeighborhoodQuery,
    GetNeighborhoodQueryVariables
  >(GetNeighborhoodDocument, options);
}
export function useGetNeighborhoodSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetNeighborhoodQuery,
        GetNeighborhoodQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetNeighborhoodQuery,
    GetNeighborhoodQueryVariables
  >(GetNeighborhoodDocument, options);
}
export type GetNeighborhoodQueryHookResult = ReturnType<
  typeof useGetNeighborhoodQuery
>;
export type GetNeighborhoodLazyQueryHookResult = ReturnType<
  typeof useGetNeighborhoodLazyQuery
>;
export type GetNeighborhoodSuspenseQueryHookResult = ReturnType<
  typeof useGetNeighborhoodSuspenseQuery
>;
export type GetNeighborhoodQueryResult = Apollo.QueryResult<
  GetNeighborhoodQuery,
  GetNeighborhoodQueryVariables
>;
export const GetOrdersDocument = gql`
  query GetOrders($input: OrdersInput!) {
    orders(input: $input) {
      orders {
        id
        status
        serviceType
      }
    }
  }
`;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrdersQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetOrdersQuery,
    GetOrdersQueryVariables
  > &
    ({ variables: GetOrdersQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(
    GetOrdersDocument,
    options
  );
}
export function useGetOrdersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetOrdersQuery,
    GetOrdersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(
    GetOrdersDocument,
    options
  );
}
export function useGetOrdersSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetOrdersQuery,
        GetOrdersQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetOrdersQuery,
    GetOrdersQueryVariables
  >(GetOrdersDocument, options);
}
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<
  typeof useGetOrdersLazyQuery
>;
export type GetOrdersSuspenseQueryHookResult = ReturnType<
  typeof useGetOrdersSuspenseQuery
>;
export type GetOrdersQueryResult = Apollo.QueryResult<
  GetOrdersQuery,
  GetOrdersQueryVariables
>;
export const GetOrderDocument = gql`
  query GetOrder($input: OrderInput!) {
    order(input: $input) {
      order {
        id
        status
        serviceType
      }
    }
  }
`;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrderQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetOrderQuery,
    GetOrderQueryVariables
  > &
    ({ variables: GetOrderQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetOrderQuery, GetOrderQueryVariables>(
    GetOrderDocument,
    options
  );
}
export function useGetOrderLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetOrderQuery,
    GetOrderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(
    GetOrderDocument,
    options
  );
}
export function useGetOrderSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetOrderQuery,
        GetOrderQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetOrderQuery,
    GetOrderQueryVariables
  >(GetOrderDocument, options);
}
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<
  typeof useGetOrderLazyQuery
>;
export type GetOrderSuspenseQueryHookResult = ReturnType<
  typeof useGetOrderSuspenseQuery
>;
export type GetOrderQueryResult = Apollo.QueryResult<
  GetOrderQuery,
  GetOrderQueryVariables
>;
export const GetPartnersDocument = gql`
  query GetPartners($input: PartnersInput!) {
    partners(input: $input) {
      partners {
        ...PartnerFragment
      }
    }
  }
  ${PartnerFragmentFragmentDoc}
`;

/**
 * __useGetPartnersQuery__
 *
 * To run a query within a React component, call `useGetPartnersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPartnersQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPartnersQuery,
    GetPartnersQueryVariables
  > &
    (
      | { variables: GetPartnersQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetPartnersQuery, GetPartnersQueryVariables>(
    GetPartnersDocument,
    options
  );
}
export function useGetPartnersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPartnersQuery,
    GetPartnersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetPartnersQuery,
    GetPartnersQueryVariables
  >(GetPartnersDocument, options);
}
export function useGetPartnersSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetPartnersQuery,
        GetPartnersQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetPartnersQuery,
    GetPartnersQueryVariables
  >(GetPartnersDocument, options);
}
export type GetPartnersQueryHookResult = ReturnType<typeof useGetPartnersQuery>;
export type GetPartnersLazyQueryHookResult = ReturnType<
  typeof useGetPartnersLazyQuery
>;
export type GetPartnersSuspenseQueryHookResult = ReturnType<
  typeof useGetPartnersSuspenseQuery
>;
export type GetPartnersQueryResult = Apollo.QueryResult<
  GetPartnersQuery,
  GetPartnersQueryVariables
>;
export const GetPartnerDocument = gql`
  query GetPartner($input: PartnerInput!) {
    partner(input: $input) {
      partner {
        ...PartnerFragment
      }
    }
  }
  ${PartnerFragmentFragmentDoc}
`;

/**
 * __useGetPartnerQuery__
 *
 * To run a query within a React component, call `useGetPartnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPartnerQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPartnerQuery,
    GetPartnerQueryVariables
  > &
    (
      | { variables: GetPartnerQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetPartnerQuery, GetPartnerQueryVariables>(
    GetPartnerDocument,
    options
  );
}
export function useGetPartnerLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPartnerQuery,
    GetPartnerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetPartnerQuery,
    GetPartnerQueryVariables
  >(GetPartnerDocument, options);
}
export function useGetPartnerSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetPartnerQuery,
        GetPartnerQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetPartnerQuery,
    GetPartnerQueryVariables
  >(GetPartnerDocument, options);
}
export type GetPartnerQueryHookResult = ReturnType<typeof useGetPartnerQuery>;
export type GetPartnerLazyQueryHookResult = ReturnType<
  typeof useGetPartnerLazyQuery
>;
export type GetPartnerSuspenseQueryHookResult = ReturnType<
  typeof useGetPartnerSuspenseQuery
>;
export type GetPartnerQueryResult = Apollo.QueryResult<
  GetPartnerQuery,
  GetPartnerQueryVariables
>;
export const GetPricingRulesDocument = gql`
  query GetPricingRules($input: PricingRulesInput!) {
    pricingRules(input: $input) {
      pricingRules {
        ... on ArticlePricingRule {
          id
          type
          isEnabled
        }
      }
    }
  }
`;

/**
 * __useGetPricingRulesQuery__
 *
 * To run a query within a React component, call `useGetPricingRulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPricingRulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPricingRulesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPricingRulesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPricingRulesQuery,
    GetPricingRulesQueryVariables
  > &
    (
      | { variables: GetPricingRulesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetPricingRulesQuery,
    GetPricingRulesQueryVariables
  >(GetPricingRulesDocument, options);
}
export function useGetPricingRulesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPricingRulesQuery,
    GetPricingRulesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetPricingRulesQuery,
    GetPricingRulesQueryVariables
  >(GetPricingRulesDocument, options);
}
export function useGetPricingRulesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetPricingRulesQuery,
        GetPricingRulesQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetPricingRulesQuery,
    GetPricingRulesQueryVariables
  >(GetPricingRulesDocument, options);
}
export type GetPricingRulesQueryHookResult = ReturnType<
  typeof useGetPricingRulesQuery
>;
export type GetPricingRulesLazyQueryHookResult = ReturnType<
  typeof useGetPricingRulesLazyQuery
>;
export type GetPricingRulesSuspenseQueryHookResult = ReturnType<
  typeof useGetPricingRulesSuspenseQuery
>;
export type GetPricingRulesQueryResult = Apollo.QueryResult<
  GetPricingRulesQuery,
  GetPricingRulesQueryVariables
>;
export const GetPricingRuleDocument = gql`
  query GetPricingRule($input: PricingRuleInput!) {
    pricingRule(input: $input) {
      pricingRule {
        ... on ArticlePricingRule {
          id
          type
          isEnabled
        }
      }
    }
  }
`;

/**
 * __useGetPricingRuleQuery__
 *
 * To run a query within a React component, call `useGetPricingRuleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPricingRuleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPricingRuleQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPricingRuleQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPricingRuleQuery,
    GetPricingRuleQueryVariables
  > &
    (
      | { variables: GetPricingRuleQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetPricingRuleQuery,
    GetPricingRuleQueryVariables
  >(GetPricingRuleDocument, options);
}
export function useGetPricingRuleLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPricingRuleQuery,
    GetPricingRuleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetPricingRuleQuery,
    GetPricingRuleQueryVariables
  >(GetPricingRuleDocument, options);
}
export function useGetPricingRuleSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetPricingRuleQuery,
        GetPricingRuleQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetPricingRuleQuery,
    GetPricingRuleQueryVariables
  >(GetPricingRuleDocument, options);
}
export type GetPricingRuleQueryHookResult = ReturnType<
  typeof useGetPricingRuleQuery
>;
export type GetPricingRuleLazyQueryHookResult = ReturnType<
  typeof useGetPricingRuleLazyQuery
>;
export type GetPricingRuleSuspenseQueryHookResult = ReturnType<
  typeof useGetPricingRuleSuspenseQuery
>;
export type GetPricingRuleQueryResult = Apollo.QueryResult<
  GetPricingRuleQuery,
  GetPricingRuleQueryVariables
>;
