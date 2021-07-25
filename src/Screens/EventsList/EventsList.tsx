import React from "react"
import { EventsListPropsTypes, EventType } from "./Types"
import {
  ColonyInitialisedComponent,
  ColonyRoleSetComponent,
  PayoutClaimedComponent,
  DomainAddedComponent,
  Container,
  ListItems,
} from "Components"
import Loader from "Components/Common/Loader/Loader"

// Should renders the list of all events
const EventsList = ({ readToRender, events, loadedAddress }: EventsListPropsTypes) => {
  return (
    <Container>
      {readToRender && loadedAddress ? (
        <ListItems>
          {events &&
            events.allEvents.map((event: EventType, index: number) => {
              // Do not use ${index} as a key if the list data is dynamic
              if (event.parsed.name === "DomainAdded") {
                return <DomainAddedComponent event={event} key={index} />
              }
              if (event.parsed.name === "ColonyRoleSet") {
                return <ColonyRoleSetComponent event={event} key={index} />
              }
              if (event.parsed.name === "PayoutClaimed") {
                return (
                  <PayoutClaimedComponent
                    event={event}
                    userAddress={event.userAddress}
                    key={index}
                  />
                )
              }
              if (event.parsed.name === "ColonyInitialised") {
                return <ColonyInitialisedComponent event={event} key={index} />
              } else {
                return <></>
              }
            })}
        </ListItems>
      ) : (
        <>
          <Loader />
          <p>This should only take a moment</p>
        </>
      )}
    </Container>
  )
}

export default EventsList