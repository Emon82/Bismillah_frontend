// root api domain.

/* const protocol = 'https://';

const host = 'www.bismillahmarriage.com';

export const baseUrl = `${protocol + host}/`;

export const baseApiUrl = `${protocol + host}/api`; */

export const baseApiUrl = 'http://localhost:3100/api';

export const signInUrl = `${baseApiUrl}/auth/login`;
export const signUpUrl = `${baseApiUrl}/auth/register`;

export const magicLogin = `${baseApiUrl}/auth/login/magic-link`;

export const otpVerifyUrl = `${baseApiUrl}/auth/verify`;
export const resendOTPUrl = `${baseApiUrl}/auth/register/resend`;

export const passResetUrl = `${baseApiUrl}/auth/password`;

export const passUpdateUrl = `${baseApiUrl}/auth/password/reset`;

export const searchUrl = `${baseApiUrl}/search`;
export const filterUrl = `${baseApiUrl}/filter`;

// profile
export const createProfileUrl = `${baseApiUrl}/user/profile`;
export const updateProfileUrl = `${baseApiUrl}/user/profile/edit`;
export const getDefaultProfileUrl = `${baseApiUrl}/user/profile/default`;
export const setDefaultProfileUrl = `${baseApiUrl}/user/profile/default`;
export const uploadAvatarUrl = `${baseApiUrl}/user/profile/avatar`;
export const reportUrl = `${baseApiUrl}/user/report`;

// connection
export const getMatchUrl = `${baseApiUrl}/user/connection`;
export const myConnection = `${baseApiUrl}/user/connection`;
export const getProfileDetailsUrl = `${baseApiUrl}/profile`;
export const getAllProfileUrl = `${baseApiUrl}/user/profile`;
export const getOutGoingUrl = `${baseApiUrl}/user/connection/outgoing-requests`;
export const getIncommingReqUrl = `${baseApiUrl}/user/connection/incoming-requests`;
export const sendConnectionUrl = `${baseApiUrl}/user/connection`;
export const deleteReqInputUrl = `${baseApiUrl}/user/connection/deletereq`;
export const acceptReqInputUrl = `${baseApiUrl}/user/connection/acceptreq`;
export const rejectReqInputUrl = `${baseApiUrl}/user/connection/rejectreq`;
export const unfriendReqInputUrl = `${baseApiUrl}/user/connection/unfriend`;
export const profileViewListUrl = `${baseApiUrl}/profile/profile-view`;

export const getConnectedUrl = `${baseApiUrl}/user/connection/connected`;

// account
export const editUserInputUrl = `${baseApiUrl}/user/account/edit`;
export const changePasswordInputUrl = `${baseApiUrl}/user/account/change-password`;
export const accountHeartbeatUrl = `${baseApiUrl}/user/account/heartbeat`;
export const refreshUrl = `${baseApiUrl}/user/account/refresh`;

//  Preference
export const preferenceInputUrl = `${baseApiUrl}/user/profile/pref`;
export const preferenceEditInputUrl = `${baseApiUrl}/user/profile/pref/edit`;
export const getPreferenceUrl = `${baseApiUrl}/user/profile/pref`;
export const getPreferenceMatchUrl = `${baseApiUrl}/user/profile/pref/preference-match`;

//  search
export const profileSearchUrl = `${baseApiUrl}/profile/search`;

//  gallery

export const uploadGalleryImageUrl = `${baseApiUrl}/user/profile/gallery/multi`;
export const deleteGalleryImageUrl = `${baseApiUrl}/user/profile/gallery/delete-single`;
export const showGalleryImageUrl = `${baseApiUrl}/user/profile/gallery`;

// subscription
export const paymentUrl = `${baseApiUrl}/payment`;
export const planList = `${baseApiUrl}/public/planlist`;
export const createSubscriptionUrl = `${baseApiUrl}/payment/create-subscription`;
export const subScriptionCalcenUrl = `${baseApiUrl}/payment/cancel-subscription`;
export const directcalcel = `${baseApiUrl}/payment/subscription`;

export const getSubscriptionDetailsUrl = `${baseApiUrl}/payment/subscription`;

// vendor
// export const createVendorProfileUrl = `${baseApiUrl}/vendor`;
export const vendorSignupUrl = `${baseApiUrl}/vendor/signup`;
export const vendorSigninUrl = `${baseApiUrl}/vendor/login`;
export const vendorResentOtpUrl = `${baseApiUrl}/vendor/register/resend`;
export const vendorOtpVerifyUrl = `${baseApiUrl}/vendor/verify`;
export const vendorEditUrl = `${baseApiUrl}/vendor-info/edit`;
export const vendorInfo = `${baseApiUrl}/vendor-info/myinfo`;
export const publicVendorListUrl = `${baseApiUrl}/public/vendor-list`;
export const publicVendordetailsUrl = `${baseApiUrl}/public/vendor`;
export const changeVendorPasswordInputUrl = `${baseApiUrl}/vendor-info/change-password`;
export const vendorPassResetUrl = `${baseApiUrl}/vendor/password`;
export const vendorPassUpdateUrl = `${baseApiUrl}/vendor/reset`;
export const uploadGalleryImageUrlVendor = `${baseApiUrl}/vendor-info/images`;
export const vendorDeleteGalleryImageUrl = `${baseApiUrl}/vendor-info/images/delete`;
export const vendorShowGalleryImageUrl = `${baseApiUrl}/public/vendor-gallery`;
export const uploadVendorSliderPhotoUrl = `${baseApiUrl}/vendor-info/image`;
