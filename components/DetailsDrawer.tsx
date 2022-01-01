import {
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";

export default function ({
  isOpen,
  onToggle,
  children,
  title = "",
}: {
  isOpen: boolean;
  onToggle: any;
  children: any;
  title: string;
}) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onToggle} size={"sm"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
