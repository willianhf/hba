import { Card, Text, Button, Link } from "@/ui/components";
import { graphql, useFragment } from "react-relay";
import { SignUpBanner_user$key } from "./__generated__/SignUpBanner_user.graphql";

const CAN_REQUEST_PLAYER_FRAGMENT = graphql`
  fragment SignUpBanner_user on User {
    canRequestPlayer
  }
`; 

interface Props {
  userRef: SignUpBanner_user$key;
}

export function SignUpBanner(props: Props) {
  const { canRequestPlayer } = useFragment(CAN_REQUEST_PLAYER_FRAGMENT, props.userRef); 

  if (!canRequestPlayer) {
    return null;
  }

  return (
    <Card className="space-y-1 md:space-y-0 md:flex md:items-center md:justify-between mb-2">
      <Text as="p">As inscrições para temporada estão abertas.</Text>
      <div className="md:inline-block">
        <Button colorScheme="red" as={Link} href="register">
          Inscrever-se
        </Button>
      </div>
    </Card>
  );
}
