import React from "react";
import "../styles/PrivacyPolicy.css";
import Policies from "../components/Policies";

const PrivacyPolicy = () => {
  const content = [
    {
      heading: "Purchase",
      policyContent: [
        "To purchase travel and related services through our site, you must give us with specific personal information such as your name, payment instrument details such as your credit card number and expiration date, credit card billing address, telephone number, e-mail address and the name or names of the person(s) traveling (if not you). We may also ask you for other personal information, such as your frequent flier numbers. We need this input to function, fulfill, and verify your reservations and transactions and keep you aware of each transaction’s stature. If you are making a reservation for one or more travelers other than yourself, you must confirm and symbolize that each of these other travelers has approved, in advance, that you may reveal their data to us.",
      ],
    },
    {
      heading: "Member Registration",
      policyContent: [
        "If you select to become a registered member of the Atraski Travel website, you must submit your name, address, telephone number, e-mail address, a unique login name, password, and password validation, and a password hint to assist you in recalling your password. This data is collected on the registration form for various reasons, comprising but not limited to:",
      ],
      listItems: [
        {
          listPara: "Personal Identification",
          content: [
            "To a perfect holiday, air, hotel, car, and other reservations",
            "To enable us to reach you for customer service goals, if essential",
            "To customize the subject of our site to attempt to fulfill your particular needs; and",
            "To create a product or other modifications to our site. Also, we require your e-mail address to substantiate your new member registration and each reservation you transact on our website.",
          ],
        },
        {
          listPara: "Member Profile",
          content: [
            "As our website member, you can want to finalize your online profile by delivering us with travel priorities, regular – traveler or affinity numbers, credit card billing information, paper vouchers/ticket delivery address, and other personal information. This data is mainly used to help you in preparing reservations rapidly without having to type in the same information often.",
          ],
        },
      ],
    },
    {
      heading: "Online Surveys",
      policyContent: [
        "We value impressions and remarks from members, so we repeatedly perform online surveys. Participation in these surveys is entirely voluntary and discretionary. Generally, the data is aggregated and used to create developments to the website and its assistance and to acquire appealing subjects, details, and advertisements for our site members. Poll partakers are anonymous unless differently expressed in the survey.",
      ],
    },
    {
      heading: "Promotions & Sweepstakes",
      policyContent: [
        "Atraski (Proprietorship) often endorses growths and sweepstakes to enable site members to win great travel and travel-related prizes. Information compiled by us for such actions may comprise contact information and survey questions. We use communication information to inform contest winners and survey data to expand promotions and product modifications to the https://atstay.in/ site.",
      ],
    },
    {
      heading: "Computerized Logging of Session Data",
      policyContent: [
        "We automatically register generic data about your computer’s connection to the Internet, which we call “session data,” that is unidentified and not associated with any personal information. Session data consists of aspects such as IP address, operating system, and type of browser software being used and the activities performed by the user while on the site. We compile session data because it assists us to assess such things as what commodities visitors are inclined to click on most, the way travelers are connecting through the site, how many visitors are surfing to several pages on the site, how long visitors to the site are remaining and how frequently they are staying. It also assists us in interpreting difficulties with our servers and lets us better administer our systems. Although such data does not recognize any visitor privately, it is probable to infer from an IP address a visitor’s Internet Service Provider (ISP), and the estimated geographic location of his or her point of connectivity.",
      ],
    },
    {
      heading: "Cookies",
      policyContent: [
        " 'Cookies' are little chunks of data that are stocked by your browser on your computer’s hard drive. Diverse beliefs are dispersing about cookies, but you should understand that cookies are only scanned by the server that placed them, and are incapable of doing such things as run programs on your computer, seed viruses or harvest your data. The use of cookies is extensive on the Internet, and Attravels’ use of cookies is similar to that of such sites as NDTV, CNN, as well as Yahoo!, and other reliable online corporations. First and foremost, you can rest ensured that no personally identifiable information (“PII”) about you (e.g., name, age, address, etc.) is collected or stocked in the cookies positioned by the www.attravels.in site and, as an outcome, none can be conveyed to any third parties. Cookies license us to attend to you better and extra efficiently and to personalize your experience on our website. Attravels utilizes cookies to customize your experience on the site and about advertisements. As to the former, these types of cookies authorize you to log in without having to type your log-in name each time (only your password is required). We may also use such cookies to illustrate an advertisement to you while you are on www.attravels.in site or to send you a “Best Day to Buy” email (or identical emails – assuming you have not opted out of accepting such emails) focus4ing on destinations in which we think you might be eager about. None of this data is passed to any third party and is used exclusively by us to deliver you with promising user expert science on the www.attravels.in site. Our advertising server may also position a cookie. Such cookies are employed only for motives of tracing the usefulness of advertising administered by us on our site, and no PII is collected from you by the use of these cookies, nor is this data shared with any third parties.",
        "Furthermore, a cookie may be positioned by our third-party advertising companies. These corporations may use aggregated statistics about your stays to this and other websites to deliver advertisings about travel-related goods and services that you may be enthusiastic about. The information they compile does not comprise your PII. The third-party advertising corporations may also operate technology that is employed to gauge the potency of ads. Any such information is anonymous. They may use this anonymous information about your visits to this and other sites to deliver advertisements about goods and services of probable concern to you. No PII is compiled during this process. The data is anonymous and does not relate online actions to an identifiable individual. Most web browsers automatically approve cookies. Of course, by altering the choices on your web browser or using particular software programs, you can regulate how and whether your browser will authorize cookies. Attravels endorses your right to obstruct any undesirable Internet activity, particularly that of unethical websites. However, blocking Attravels’ cookies may incapacitate specific features on the www.attravels.in site, and may make it difficult to purchase or use specific services accessible on the www.attravels.in site. Please note that it is feasible to block cookie Activity from particular websites while allowing cookies from sites you rely on, like Attravels.",
      ],
    },
    {
      heading: "Other",
      policyContent: [
        "From time to time, we may enhance or expand services accessible on the website. To the degree these services are delivered and utilized by you, we will employ the data you provide to enable the service ordered. For example, if you email us with an issue, we will use your email address, name, nature of the problem, etc. to acknowledge your point. We may also stock such data to help us in making the site better and simpler to use.",
      ],
    },
  ];

  return (
    <div className="policy-container">
      <h1 className="policy-main-heading">Privacy Policy</h1>
      <div className="policy-content-container">
        <p className="policy-content">
          ATStay is dedicated to protecting the privacy of personal information
          that you deliver to us when utilizing our Journey Travel & Tours
          website. Please take a minute to assess this Privacy Policy (referred
          to as “Policy”), where you can discover more details about how we
          compile and process your information. I request you to note that we
          evaluate our Privacy Policy from time to time, and we may make
          occasional modifications to the policy about that analysis. Therefore,
          you may want to bookmark this page and sometimes scan this page to
          ensure that you have the latest version. Nevertheless, of later
          updates, we will withstand by the privacy practices defined to you in
          this Privacy Policy at the time you submitted us with your personal
          information. What personal information we obtain from you and how we
          utilize it? When checking our site, you are not expected to furnish
          any personal information unless and until you select to make a
          purchase or register one of our e-mail newsletters or other assistance
          as described below.
        </p>
      </div>
      <div className="policies-container">
        <Policies content={content} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
