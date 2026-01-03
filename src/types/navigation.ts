
export type RootStackParamList = {
    Splash: undefined;
    Welcome: undefined;
    RoleSelection: undefined;
    SellerRegister: undefined;
    SellerDashboard: undefined;
    AddProperty: undefined;
    ChatList: undefined;
    ChatScreen: { userId: string; userName: string; propertyTitle?: string };
    BuyerRegister: undefined;
    BuyerMain: undefined;
    PropertyDetails: { propertyId: string; userRole?: 'seller' | 'buyer' | 'investor' };
    InvestorRegister: undefined;
    SellerProfile: undefined;
    ListingsManagement: { filter?: 'active' | 'views' };
    InquiriesList: undefined;
    BuyerProfile: undefined;
    SavedProperties: undefined;
    Onboarding: undefined;
    EditProfile: {
        currentName: string;
        currentImage: string;
        currentFirm?: string;
        userRole: 'seller' | 'buyer';
    };
};
