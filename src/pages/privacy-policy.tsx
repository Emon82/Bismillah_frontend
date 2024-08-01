import Footer from '@/components/footer';
import { Header } from '@/components/header';
import { bgGray, golden } from '@/themes/custom.color';

import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Heading,
  HStack,
  Image,
  Link,
  Select,
  Stack,
  Text,
  useBreakpointValue,
  GridItem,
  Flex,
  useToast,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Special } from '../components/special';

export default function Home() {
  const cardSliderResize = useBreakpointValue([100, 100, 50, 30]);

  interface HomeType {
    name: string;
    link: string;
  }
  const HelpLink: React.FC<HomeType> = ({ name, link }) => (
    <Center my={2}>
      <Link fontSize={['12px', '14px', '14px', '16px']} href={link}>
        {name}
      </Link>
    </Center>
  );

  return (
    <div>
      <Box bg={bgGray} pt="5">
        <Box mx={['20px', '20px', '50px', '100px']}>
          <Heading as="h3" size="lg" color={golden}>
            Privacy Policy of{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>
          </Heading>
          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>
            is an online matrimonial portal endeavoring constantly to provide
            you with matrimonial services. This privacy statement is common to
            all the matrimonial Website/apps operated under{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            Since we are strongly committed to your right to privacy, we have
            drawn out a privacy statement with regard to the information we
            collect from you. You acknowledge that you are disclosing
            information voluntarily. By accessing /using the website/apps and/or
            by providing your information, you consent to the collection and use
            of the info you disclose on the website/apps in accordance with this
            Privacy Policy. If you do not agree for use of your information,
            please do not use or access this website/apps.
          </Text>
          <Heading as="h3" size="sm" mt="3">
            What information you need to give in to use this Website/apps?
          </Heading>

          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            The information we gather from members and visitors who apply for
            the various services our website/apps offers includes, but may not
            be limited to, email address, name, date of birth, educational
            qualifications a user-specified password, mailing address, zip/pin
            code and telephone/mobile number or fax number. We use a secure
            server for credit card transactions to protect the credit card
            information of our users and Cookies are used to store the login
            information. Cookies are small files placed on your hard drive that
            will assist us in providing our services. You may also encounter
            Cookies or identical/related devices on certain pages of the
            website/apps that are placed by third parties. We do not control the
            use of cookies by third parties. If you establish a credit account
            with us to pay the fees we charge, some additional information,
            including a billing address, a credit/debit card number and a
            credit/debit card expiration date and tracking information from
            demand drafts is collected.
            <br />
            We may use also your personal information for analysis of data,
            usage trends and to evaluate and improve our site/App, marketing
            research, preventing of frauds. In our efforts to continually
            improve our product and service offerings, we collect and analyze
            demographic and profile data about our users activity on our
            website/apps. We identify and use your IP address to help diagnose
            problems with our server, and to administer our website/apps. Your
            IP address is also used to help identify you and to gather broad
            demographic information.
          </Text>

          <Heading as="h3" size="sm" mt="3">
            How the website/apps uses the information it collects/tracks?
          </Heading>
          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            collects information for data analysis, identifying usage trends,
            determining the effectiveness of our promotional campaigns and to
            evaluate and improve our websites or apps, products, and services,
            marketing research from our users primarily to ensure that we are
            able to fulfil your requirements and to deliver Personalized
            experience.
          </Text>

          <Heading as="h3" size="sm" mt="3">
            For European Union Members (EU)
          </Heading>
          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            If you are located in the EU, you will be asked to provide consent
            to the collection, processing, and sharing of your personal
            information. Personal information means any information related to
            an identified or identifiable natural person. You have the right to
            share and access your personal information and right to withdraw
            consent for sharing your personal information at any point of time
            and right to erase your personal information subject to applicable
            laws. for sharing your personal information at any point of time.
            You can withdraw your consent provided by contacting us. Your
            personal information may be stored in databases located outside of
            the EU including in India. Where we transfer personal data outside
            of EU, we either transfer personal information to countries that
            provide an adequate level of protection or we have appropriate
            safeguards in place. We may require proof of or need to verify your
            identity before we can give effect to these rights. To request to
            review, update, or delete your personal information, please submit a
            request form by sending an email to privacy@bismillahmarriage.com.
            We may share your information with third parties who are an
            anti-fraud solution provider(s) located in UK. They help us to
            ensure we keep you safe from scammers and fraudster.
          </Text>

          <Heading as="h3" size="sm" mt="3">
            How Long Do We Keep Your Information?
          </Heading>

          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            As stipulated in the Privacy Policy we will retain the information
            we collect from users under the following circumstances:
            <br />
            For as long as the users subscribe to our services to meet their
            suitable purpose(s) for which it was collected, for the sake of
            enforcing agreements, for performing audits, for resolving any form
            of disputes, for establishing legal defenses, for pursuing
            legitimate businesses and to comply with the relevant applicable
            laws.
          </Text>

          <Heading as="h3" size="sm" mt="3">
            What are the Security Precautions in respect of your personal
            information?
          </Heading>

          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            We aim to protect your personal information through a system of
            organizational and technical security measures. We have implemented
            appropriate internal control measures designed to protect the
            security of any personal information we process. However, please
            also remember that we cannot guarantee that the internet itself is
            100% secure. Once your information is in our possession, we adhere
            to security guidelines protecting it against unauthorized access.
          </Text>

          <Heading as="h3" size="sm" mt="3">
            Change of Privacy Policy
          </Heading>

          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            We may change this Privacy Policy without notice from time to time
            without any notice to you. However, changes will be updated in the
            Privacy Policy page.
          </Text>

          <Heading as="h3" size="sm" mt="3">
            How to address your Grievance: (YOUR OFFICE ADDRESS AND EMAIL INPUT
            HERE)
          </Heading>

          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            The Grievance officer shall be available between 10 am to 6 pm IST
            from Monday to Friday excluding Saturday, Sunday&apos; and Public
            Holidays in UK.
          </Text>

          <Heading as="h3" size="lg" color={golden}>
            Terms of Use
          </Heading>

          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            Welcome to{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>
            , your personal matrimonial platform.{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            is a wedding platform that provides matches to all to be bride and
            grooms and replaces the traditional newspaper classifieds. Bismillah
            Marriage limited helps match your profile to the prospective suitor.
            It is a platform for those in seeking a life-partner. Access to the
            Bismillah Marriage limited website is free as well as premium
            package. However, we charge when a user intends to contact a
            suitable partner. In order to use the Bismillah Marriage limited
            (Site), you must be a registrant Member at the site. The Member or
            any users using the Site agree to be bound by these Terms of Use
            Agreement. If you wish to become a Member and make use of the
            Bismillah Marriage limited service read these Terms of Use and
            follow the instructions in the Registration process. This Agreement
            sets out the legally binding terms for your use of the Site and
            membership. This Agreement may be modified by Biyeta.com from time
            to time.
          </Text>

          <Heading as="h3" size="xs" mt="3">
            1. Eligibility
          </Heading>

          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            To register as a member of{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            or use this Site, you must be of legal marriageable age as per the
            laws of United Kingdom (UK) (currently, 18 years or over for females
            and 21 years or over for males). The{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            site is only to facilitate match between suitors for lawful
            matrimonial alliance between persons who are legally competent to
            enter into matrimony under the laws to which they are subject.
            Membership in the Service is void where prohibited. By using this
            Site, you represent and warrant that you have the right, authority,
            and legal capacity to enter into this Agreement and that you are not
            prohibited or prevented by any applicable law for the time being in
            force or any order or decree or injunction from any court, tribunal
            or any such competent authority restraining you from entering into
            matrimony. You also agree to abide by all of the terms and
            conditions of this Agreement. If at any time Bismillah Marriage
            limited is of the opinion (in its sole discretion) or has any reason
            to believe that you are not eligible to become a member or that you
            have made any misrepresentation about your eligibility,{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            reserves the right to forthwith terminate your membership and / or
            your right to use the Service without any refund to you of any of
            your unutilized subscription fee.
          </Text>

          <Heading as="h3" size="xs" mt="3">
            2. Term
          </Heading>

          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            You may terminate your membership at any time, for any reason by
            writing to{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>
            . Any subscription fee paid to{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            is non-refundable. In the event you terminate your membership, you
            will not be entitled to a refund of any unutilized subscription
            fees, if any, paid by you.{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            may terminate your access to the Site and/or your membership for any
            reason effective upon sending notice to you at the email address as
            provided by you in your application for membership. If{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            terminates your membership for breach of terms of this Agreement,
            you will not be entitled to any refund of any unused Subscription
            fees, if any, paid by you.{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            has the right to change its pricing policy, subscription policy,
            payment policy, membership policy, membership term policy, as well
            as any other policies and methods that govern its website, Android
            application and services without prior notice and with immediate
            effect.
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            has the full authority to bring any and all changes to its website,
            Android application, and services.
          </Text>

          <Heading as="h3" size="xs" mt="3">
            3. Non-Commercial Use by Members
          </Heading>
          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            Bismillah Marriage limited Site is for the personal use of
            individual members to register their profiles and find matches for
            the purpose of generating Accepts from relevant matches and cannot
            be used in connection with any other commercial endeavors.
            Permission to view full profile and contact are each considered as
            an “Accept”. This includes providing links to other web sites,
            whether deemed competitive to Biyeta.com or otherwise.
            Organizations, companies, and/or businesses cannot become Members of{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            and should not use the{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            Service or Site for any purpose. Illegal and/or unauthorized uses of
            the Site, including unauthorized framing of or linking to the Site
            will be investigated, and appropriate legal action will be taken,
            including without limitation, civil, criminal, and injunctive
            redress.
          </Text>

          <Heading as="h3" size="xs" mt="3">
            4. Other Terms of Use by Members
          </Heading>
          <Box pl="5">
            <UnorderedList>
              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  a.{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    Bismillah Marriage limited{' '}
                  </span>{' '}
                  reserves the right in its sole discretion to review the
                  activity & status of each account & block the account of a
                  member based on such review.
                </Text>
              </ListItem>

              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  b. You hereby confirm that as on date of this registration,
                  you do not have any objection to receiving emails, messages
                  and calls from{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    Bismillah Marriage limited{' '}
                  </span>{' '}
                  and members of{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    Bismillah Marriage limited{' '}
                  </span>{' '}
                  as long as you are a registered member of{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    Bismillah Marriage limited{' '}
                  </span>
                  . This consent shall supersede any preferences set by you with
                  or registration done with the Do Not Disturb (DND Register)/
                  National Customer Preference Register (NCPR). This consent
                  extends to emails, messages or calls relating but not limited
                  to phone number verification, the provision of matrimonial
                  advertising service, matrimonial enquiries and promotions.
                </Text>
              </ListItem>
            </UnorderedList>
          </Box>
          <Heading as="h3" size="xs" mt="3">
            5. Proprietary Rights in the Content on{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>
          </Heading>
          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            Bismillah Marriage limited owns and retains all proprietary rights
            in the{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            Site and the{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            Service. The Site contains the copyrighted Marital, trademarks, and
            other proprietary information of{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>
            , and its licensors. Except for that information which is in the
            public domain such as member profile or for which permission has
            been obtained from the user, you cannot copy, modify, publish,
            transmit, distribute, perform, display, or sell any such proprietary
            information. Any such act or an attempted act on your part shall
            constitute a violation of this Agreement and your membership is
            liable to be terminated forthwith by{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            without refund of any of your unused Subscription fees. We also
            reserve our right to take legal action (civil and/or criminal)
            wherever applicable for any violations.
          </Text>

          <Heading as="h3" size="xs" mt="3">
            6. Content Posted on the Site
          </Heading>
          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            You understand and agree that{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            may delete any listing, content, communication, photos or profiles
            (collectively, Content) that in the sole judgment of{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            violate this Agreement or which might be offensive, illegal, or that
            might violate the rights, harm, or threaten the safety of either{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            and/or its Members. Biyeta.com reserves the right to ban or make
            inactive any account and its content, including but not limited to:
            listing, communication, photos and/or profiles which{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            deems to contain incorrect, misleading or spurious information.
          </Text>
          <Box pl="5">
            <UnorderedList>
              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  a. With respect to Content you submit or make available for
                  inclusion on publicly accessible areas of the Site including
                  but not limited to your contact details, you hereby
                  unconditionally and irrevocably grant to Bismillah Marriage
                  limited the license to use, distribute, reproduce, modify,
                  adapt, publicly perform and publicly display such Content on
                  the Site
                </Text>
              </ListItem>

              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  b. You shall use the Services only to find matches for your
                  profile and to reach out to other Members for the purpose of
                  driving an ‘Accept’ from relevant matches. You understand and
                  hereby agree that all information, data, text, photographs,
                  graphics, communications, tags, or other Content whether
                  publicly posted or privately transmitted or otherwise made
                  available to Bismillah Marriage limited are the sole
                  responsibility of the person from whom such Content originated
                  and shall be at the member&apos;/person&apos; sole risks and
                  consequences. This means that you are solely responsible for
                  all Content that you upload, post, email, transmit or
                  otherwise make available via the Service. Bismillah Marriage
                  limited does not control the Content posted via the Service
                  and, as such, does not guarantee the accuracy, integrity or
                  quality of such Content. Under no circumstances will Bismillah
                  Marriage limited be liable in any way for any Content,
                  including, but not limited to, any errors or omissions in any
                  Content, or any loss or damage of any kind incurred as a
                  result of the use of any Content posted, emailed, transmitted
                  or otherwise made available via the Service. Bismillah
                  Marriage limited reserves the right to verify the authenticity
                  of Content posted on the Site. In exercising this right,
                  Bismillah Marriage limited may ask you to provide any
                  documentary or other form of evidence supporting the Content
                  you post on the Site. If you fail to produce such evidence,
                  Bismillah Marriage limited may, in its sole discretion,
                  terminate your Membership without a refund.
                </Text>
              </ListItem>

              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  c. By posting Content/ advertising to any public area of
                  Bismillah Marriage limited, you automatically grant, and you
                  represent and warrant that you have the right to grant, to
                  Bismillah Marriage limited, and other Bismillah Marriage
                  limited Members, an irrevocable, perpetual, non-exclusive,
                  fully-paid, worldwide license to use, copy, perform, display,
                  and distribute such information and content and to prepare
                  derivative works of, or incorporate into other works, such
                  information and content, and to grant and authorize
                  sublicenses of the foregoing.
                </Text>
              </ListItem>

              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  d. The following is an indicative list of the kind of Content
                  that is illegal or prohibited on the Site. Bismillah Marriage
                  limited will investigate and take appropriate legal action in
                  its sole discretion against anyone who violates this
                  Agreement, including without limitation, removing the
                  offending communication / Content from the Service and
                  terminating the Membership of such violators without a refund.
                  Illegal and prohibitive Content includes Content which:
                </Text>
              </ListItem>
            </UnorderedList>
          </Box>

          <Heading as="h3" size="xs" mt="3">
            7. Copyright Policy
          </Heading>

          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            You cannot post, distribute, or reproduce in any way any copyrighted
            Marital, trademarks, or other proprietary information without
            obtaining the prior written consent of the owner of such proprietary
            rights. Without limiting the foregoing, if you believe that your
            work has been copied and posted on the Bismillah Marriage limited
            service in a way that constitutes copyright infringement, please
            provide us with the following information:
          </Text>
          <Box pl="5">
            <UnorderedList>
              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  an electronic or physical signature of the person authorized
                  to act on behalf of the owner of the copyright interest;
                </Text>
              </ListItem>

              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  a description of the copyrighted work that you claim has been
                  infringed;
                </Text>
              </ListItem>

              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  a description of where the Marital that you claim is
                  infringing is located on our Site;
                </Text>
              </ListItem>

              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  your address, telephone number, and email address;
                </Text>
              </ListItem>
              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  a written statement by you that you have a good faith belief
                  that the disputed use is not authorized by the copyright
                  owner, its agent, or the law;
                </Text>
              </ListItem>
              <ListItem>
                <Text
                  py="4"
                  color="dark"
                  fontSize={[15, 15, 15, 16]}
                  textAlign="justify"
                  fontFamily="sans-serif"
                >
                  a statement by you, made under penalty of perjury, that the
                  above information in your Notice is accurate and that you are
                  the copyright owner or authorized to act on the copyright
                  owners behalf.
                </Text>
              </ListItem>
            </UnorderedList>
          </Box>
          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            Notice of claims of copyright infringement can be sent to us in
            writing to the Dhaka address located under the Help/Contact section
            on the site.
          </Text>

          <Heading as="h3" size="xs" mt="3">
            8. Member Disputes
          </Heading>

          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            You are solely responsible for your advertisement/communications
            with other{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            Members.{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            reserves the right, but has no obligation, to monitor disputes
            between you and other Members.{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            also reserves the right to take appropriate action against errant
            members. However,{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            is not obliged to share such action with other members, including
            complainants.{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            expressly disclaims any responsibility or liability for any
            transactions or interactions between the members inter-se.
          </Text>

          <Heading as="h3" size="xs" mt="3">
            9. Privacy
          </Heading>
          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            Use of the{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            Site and/or the{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            Service is governed by our privacy policy. Disclaimers.
            <br />
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            is not responsible for any incorrect or inaccurate Content/listing
            posted on the Site or in connection with the{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            Service, whether caused by Users, Members or by any of the equipment
            or programming associated with or utilized in the Service, nor for
            the conduct of any User and/or Member of the{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            Service whether online or offline.{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            assumes no responsibility for any error, omission, interruption,
            deletion, defect, delay in operation or transmission, communications
            line failure, theft or destruction or unauthorized access to, or
            alteration of, User and/or Member communications or any
            communications by Bismillah Marriage limited to its Members.
          </Text>
          <Heading as="h3" size="xs" mt="3">
            10. Limitation on Liability
          </Heading>
          <Text
            py="4"
            color="dark"
            fontSize={[15, 15, 15, 16]}
            textAlign="justify"
            fontFamily="sans-serif"
          >
            In no event will{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            be liable to you or any third person for any indirect,
            consequential, exemplary, incidental, special or punitive damages,
            including also lost profits arising from your use of the Site or the{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            Service, even if{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            has been advised of the possibility of such damages. Notwithstanding
            anything to the contrary contained herein,{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>{' '}
            liability to you for any cause whatsoever, and regardless of the
            form of the action, will at all times be limited to the amount paid,
            if any, by you to{' '}
            <span style={{ fontWeight: 'bold' }}>
              Bismillah Marriage limited{' '}
            </span>
            , for the Service during the term of membership.
          </Text>
        </Box>
        {/* <Box bg={golden} color="white" py="4">
          <Text textAlign="center" fontSize={['md', 'lg', '2xl', '3xl']}>
            Download the App
          </Text>
          <HStack justify="center">
            <Image
              w={['75px', '90px', '110px', '150px']}
              objectFit="contain"
              src="/app/playstore-v2.png"
              alt="Dan Abramov"
            />
            <Image
              w={['75px', '90px', '110px', '150px']}
              objectFit="contain"
              ml={4}
              src="/app/appstore-v2.png"
              alt="Segun Adebayo"
            />
          </HStack>
        </Box> */}
        {/* <Box bg={bgGray} paddingX={['10px', '20px', '80px', '150px']} py={5}>
          <Grid
            gridTemplateColumns={[
              'repeat(2, 1fr)',
              'repeat(2, 1fr)',
              'repeat(4, 1fr)',
              'repeat(4, 1fr)',
            ]}
            gap={6}
          >
            <Box my={['0px', '10px', '30px', '40px']}>
              <Center mb={3}>
                <Text fontSize="xl">Need Help?</Text>
              </Center>
              <Divider colorScheme="pink" borderWidth="2px" />
              <Box my={['10px', '10px', '25px', '30px']}>
                <HelpLink name="Member Login" link="/story" />
                <HelpLink name="Sign Up" link="/" />
                <HelpLink name="Premium Membership" link="/" />
                <HelpLink name="Customer Support" link="/" />
                <HelpLink name="Sitemap" link="/" />
              </Box>
            </Box>
            <Box my={['0px', '10px', '30px', '40px']}>
              <Center mb={3}>
                <Text fontSize="xl">Company</Text>
              </Center>
              <Divider colorScheme="pink" borderWidth="2px" />
              <Box my={['0px', '5px', '25px', '30px']}>
                <NextLink passHref href="/contact">
                  <Link>
                    <HelpLink name="Contact Us" link="#" />
                  </Link>
                </NextLink>
                <HelpLink name="About Us" link="#" />
                <HelpLink name="Premium Membership" link="/" />
                <HelpLink name="Customer Support" link="/" />
                <HelpLink name="Sitemap" link="/" />
              </Box>
            </Box>
            <Box my={['0px', '10px', '30px', '40px']}>
              <Center mb={3}>
                <Text fontSize="xl">More</Text>
              </Center>
              <Divider colorScheme="pink" borderWidth="2px" />
              <Box my={['10px', '5', '25px', '30px']}>
                <HelpLink name="Member Login" link="/" />
                <HelpLink name="Sign Up" link="/" />
                <HelpLink name="Premium Membership" link="/" />
                <HelpLink name="Customer Support" link="/" />
                <HelpLink name="Sitemap" link="/" />
              </Box>
            </Box>
            <Box my={['0px', '10px', '30px', '40px']}>
              <Center mb={3}>
                <Text fontSize="xl">Privacy & policy</Text>
              </Center>
              <Divider colorScheme="pink" borderWidth="2px" />
              <Box my={['0px', '10px', '25px', '30px']}>
                <HelpLink name="privacy & policy" link="/privacy-policy" />
              </Box>
            </Box>
          </Grid>
        </Box> */}
        <Footer />
      </Box>
    </div>
  );
}
