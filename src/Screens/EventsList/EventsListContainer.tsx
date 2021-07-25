import React, { useEffect, useState } from "react"
import { utils } from "ethers"
import { InfuraProvider } from "ethers/providers"
import { getBlockTime } from "@colony/colony-js"
import Home from "./EventsList"
import colonyClient from "../../Hooks/colonyClient"
import colonyEventHandler from "../../Hooks/colonyEventHandler"
import { LogProps, EventType } from "./Types"

// Should get all events
const EventsListContainer = () => {
  const provider = new InfuraProvider()
  const [events, setEvents] = useState<any>()
  const [instance, setInstance] = useState<any>()
  const [loadedDates, setLoadedDates] = useState<boolean>(false)
  const [loadedAddress, setLoadedAddress] = useState<boolean>(false)
  const [readToRender, setReadToRender] = useState<boolean>(false)

  useEffect(() => {
    const getEventLogs = async () => {
      const instance = await colonyClient()
      setInstance(instance)
      const events = await colonyEventHandler(instance)
      setEvents(events)
    }
    getEventLogs()
  }, [])

  useEffect(() => {
    // Should get dates
    events &&
      events.allEvents.forEach((e: LogProps, index: number) => {
        const getBlockTimeAsync = async () => {
          const date = await getBlockTime(provider, e.blockHash);
          if (date) {
            events.allEvents[index] = {
              parsed: instance.interface.parseLog(events.allEvents[index]),
              raw: events.allEvents[index],
              date: date,
            }

            if (index === events.allEvents.length - 1) {
              setTimeout(function () {
                setLoadedDates(true)
              }, 1000)
            }
          }
        }
        getBlockTimeAsync()
      })
    // eslint-disable-next-line
  }, [events])

  // Should add the userAddress to PayoutClaimed
  useEffect(() => {
    if (loadedDates) {
      events.allEvents.forEach((e: any, index: number) => {
        if (e.parsed.name === "PayoutClaimed") {
          const getAddress = async () => {
            const humanReadableFundingPotId = new utils.BigNumber(
              e.parsed.values.fundingPotId
            ).toString()
            const { associatedTypeId } = await instance.getFundingPot(
              humanReadableFundingPotId
            )
            const { recipient: userAddress } = await instance.getPayment(
              associatedTypeId
            )
            return userAddress
          }
          getAddress().then(address => {
            events.allEvents[index].userAddress = address
          })
        }

        if (index === events.allEvents.length - 1) {
          setLoadedAddress(true)
        }
      })
    }
    // eslint-disable-next-line
  }, [loadedDates])

  useEffect(() => {
    // Should sort by date
    if (loadedAddress) {
      events &&
        events.allEvents.sort(function (a: EventType, b: EventType) {
          return b.date - a.date
        })
      events && setReadToRender(true)
    }
    // eslint-disable-next-line
  }, [loadedDates, loadedAddress])

  return (
    <Home
      readToRender={readToRender}
      events={events}
      loadedAddress={loadedAddress}
    />
  )
}

export default EventsListContainer