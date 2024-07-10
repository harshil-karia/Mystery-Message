import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
  } from '@react-email/components';
  
  interface ChangePasswordEmailProps {
    username: string;
  }
  
  export default function ChangePasswordEmail({ username }: ChangePasswordEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Change Password</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Here&apos;s your password verification link</Preview>
        <Section>
          <Row>
            <Heading as="h2">Hello {username},</Heading>
          </Row>
          <Row>
            <Text>
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
          <Row>
            <Button
              href={`http://localhost:3000/changePassword/${username}`}
              style={{ color: '#61dafb' }}
            >
              Update here
            </Button>
          </Row>
        </Section>
      </Html>
    );
  }