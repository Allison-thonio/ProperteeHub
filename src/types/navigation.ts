
export type RootStackParamList = {
    Welcome: undefined;
    RoleSelection: undefined;
    SellerRegister: undefined;
    SellerDashboard: undefined;
    AddProperty: undefined;
    ChatList: undefined;
    ChatScreen: { userId: string; userName: string; propertyTitle?: string };
    BuyerRegister: undefined;
    BuyerMain: undefined;
    PropertyDetails: { propertyId: string };
    InvestorRegister: undefined;
    SellerProfile: undefined;
    ListingsManagement: { filter?: 'active' | 'views' };
    InquiriesList: undefined;
};
