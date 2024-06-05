import Footer from "../components/Footer";
import "../styles/PrivacyPolicy.css";

const TermsConditions = () => {
  return (
    <>
      <div className="policy-container">
        <h1 className="policy-main-heading">Terms and Conditions</h1>
        <div className="">
          <p className="policy-content">
            AtStay welcomes you to our Journey Travel & Tours website. By
            accessing and using our site, you agree to comply with and be bound
            by the following terms and conditions (referred to as "Terms"). If
            you do not agree to these Terms, please do not use our site. We
            reserve the right to modify these Terms at any time, and such
            modifications will be effective immediately upon posting on our
            site.
          </p>
        </div>
        <div className=" ">
          <h2 className="sub-heading">General Terms</h2>
          <ol className="policy-list" style={{ marginBottom: "1rem" }}>
            <li>
              <span className="list-heading">Use of Site:</span> You agree to
              use our site for lawful purposes only. You shall not use our site
              for any illegal or unauthorized purposes or engage in any
              activities that could harm or interfere with the operation of our
              site.
            </li>
            <li>
              <span className="list-heading">Intellectual Property:</span> All
              content, trademarks, and data on our site, including but not
              limited to software, databases, text, graphics, icons, hyperlinks,
              private information, designs, and agreements, are the property of
              or licensed to AtStay and as such are protected from infringement
              by local and international legislation and treaties. Unauthorized
              use, copying, reproduction, modification, republishing, uploading,
              posting, transmitting, or distribution of any content is strictly
              prohibited.
            </li>
            <li>
              <span className="list-heading">User Accounts:</span> To access
              certain features of our site, you may be required to create an
              account and provide certain personal information. You are
              responsible for maintaining the confidentiality of your account
              information and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized use of your
              account or any other breach of security.
            </li>
            <li>
              <span className="list-heading">Non-Refundable Transactions:</span>{" "}
              Please note that all transactions made on our site are
              non-refundable. By making a purchase, you acknowledge and agree to
              this condition.
            </li>
            <li>
              <span className="list-heading"> Limitation of Liability:</span>{" "}
              AtStay shall not be liable for any direct, indirect, incidental,
              special, or consequential damages that result from the use of, or
              the inability to use, our site, including but not limited to
              reliance by a user on any information obtained from AtStay or that
              result from mistakes, omissions, interruptions, deletion of files
              or emails, errors, defects, viruses, delays in operation or
              transmission, or any failure of performance, whether or not
              resulting from acts of God, communications failure, theft,
              destruction, or unauthorized access to AtStay’ records, programs,
              or services. You hereby acknowledge that this paragraph shall
              apply to all content, merchandise, and services available through
              our site.
            </li>
            <li>
              <span className="list-heading">Governing Law:</span> These Terms
              shall be governed by and construed in accordance with the laws of
              the jurisdiction in which Atraski Travels operates, without regard
              to its conflict of law principles. You agree to submit to the
              personal jurisdiction of the courts located in that jurisdiction
              for the resolution of any disputes.
            </li>
            <li>
              <span className="list-heading"> Privacy Policy:</span> Your use of
              our site is also governed by our Privacy Policy, which is
              incorporated into these Terms by this reference. Please review our
              Privacy Policy to understand our practices regarding your personal
              information.
            </li>
            <li>
              <span className="list-heading"> Amendments:</span> AtStay reserves
              the right to amend these Terms at any time. Any such amendments
              will be effective immediately upon posting on our site. Your
              continued use of the site will be deemed acceptance thereof.
            </li>
            <li>
              <span className="list-heading"> Contact Information:</span> If you
              have any questions or concerns about these Terms, please contact
              us at atstaytravel@gmail.com.
            </li>
          </ol>
        </div>
        <p>
          By using our site, you acknowledge that you have read, understood, and
          agree to be bound by these Terms and Conditions. Thank you for
          choosing AtStay for your travel needs.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
