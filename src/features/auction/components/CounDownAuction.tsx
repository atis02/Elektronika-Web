import React, { useEffect } from "react";

interface TimeRemaining {
  complete: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface AuctionTimerProps {
  endDate: string;
  timerId: string;
}

function getTimeSegmentElements(segmentElement: HTMLElement) {
  const segmentDisplay = segmentElement.querySelector(
    ".segment-display"
  ) as HTMLElement;
  const segmentDisplayTop = segmentDisplay.querySelector(
    ".segment-display__top"
  ) as HTMLElement;
  const segmentDisplayBottom = segmentDisplay.querySelector(
    ".segment-display__bottom"
  ) as HTMLElement;

  const segmentOverlay = segmentDisplay.querySelector(
    ".segment-overlay"
  ) as HTMLElement;
  const segmentOverlayTop = segmentOverlay.querySelector(
    ".segment-overlay__top"
  ) as HTMLElement;
  const segmentOverlayBottom = segmentOverlay.querySelector(
    ".segment-overlay__bottom"
  ) as HTMLElement;

  return {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

const updateSegmentValues = (
  displayElement: HTMLElement,
  overlayElement: HTMLElement,
  value: number
) => {
  displayElement.textContent = value.toString();
  overlayElement.textContent = value.toString();
};

const updateTimeSegment = (segmentElement: HTMLElement, timeValue: number) => {
  const segmentElements = getTimeSegmentElements(segmentElement);

  if (
    parseInt(segmentElements.segmentDisplayTop.textContent!, 10) === timeValue
  ) {
    return;
  }

  segmentElements.segmentOverlay.classList.add("flip");
  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );

  const finishAnimation = () => {
    segmentElements.segmentOverlay.classList.remove("flip");
    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );
  };

  segmentElements.segmentOverlay.addEventListener(
    "animationend",
    finishAnimation
  );

  return () => {
    segmentElements.segmentOverlay.removeEventListener(
      "animationend",
      finishAnimation
    );
  };
};

const CountdownTimer: React.FC<AuctionTimerProps> = ({ endDate, timerId }) => {
  const targetDate = new Date(endDate);

  const updateTimeSection = (sectionID: string, timeValue: number) => {
    const firstNumber = Math.floor(timeValue / 10) || 0;
    const secondNumber = timeValue % 10 || 0;
    const sectionElement = document.getElementById(`${sectionID}-${timerId}`)!;
    // const timeSegments = sectionElement.querySelectorAll(".time-segment");

    if (sectionElement) {
      const timeSegments = sectionElement.querySelectorAll(".time-segment");
      updateTimeSegment(timeSegments[0] as HTMLElement, firstNumber);
      updateTimeSegment(timeSegments[1] as HTMLElement, secondNumber);
    } else {
      console.warn(`Element with ID ${sectionID}-${timerId} not found!`);
    }
    // updateTimeSegment(timeSegments[0] as HTMLElement, firstNumber);
    // updateTimeSegment(timeSegments[1] as HTMLElement, secondNumber);
  };

  const getTimeRemaining = (targetDateTime: number): TimeRemaining => {
    const nowTime = Date.now();
    const complete = nowTime >= targetDateTime;

    if (complete) {
      return { complete, days: 0, seconds: 0, minutes: 0, hours: 0 };
    }

    const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);
    const days = Math.floor(secondsRemaining / (60 * 60 * 24));
    const hours = Math.floor(secondsRemaining / (60 * 60)) - days * 24;
    const minutes =
      Math.floor(secondsRemaining / 60) - days * 24 * 60 - hours * 60;
    const seconds = secondsRemaining % 60;

    return { complete, days, seconds, minutes, hours };
  };

  const updateAllSegments = () => {
    const timeRemainingBits = getTimeRemaining(targetDate.getTime());

    updateTimeSection("days", timeRemainingBits.days);
    updateTimeSection("hours", timeRemainingBits.hours);
    updateTimeSection("minutes", timeRemainingBits.minutes);
    updateTimeSection("seconds", timeRemainingBits.seconds);

    return timeRemainingBits.complete;
  };
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      const isComplete = updateAllSegments();
      if (isComplete) {
        clearInterval(countdownTimer);
      }
    }, 1000);

    updateAllSegments();

    return () => {
      clearInterval(countdownTimer);
    };
  }, [endDate]);

  return (
    <div className="countdown">
      <div className="time-section" id={`days-${timerId}`}>
        <div className="time-group">
          <div className="time-segment">
            {" "}
            {/* Added segment for tens of days */}
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
          <div className="time-segment">
            {" "}
            {/* Added segment for ones of days */}
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
        </div>
        <p>Gün</p>
      </div>
      <div className="time-section" id={`hours-${timerId}`}>
        <div className="time-group">
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
        </div>
        <p>Sagat</p>
      </div>

      <div className="time-section" id={`minutes-${timerId}`}>
        <div className="time-group">
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
        </div>
        <p>Minut</p>
      </div>

      <div className="time-section" id={`seconds-${timerId}`}>
        <div className="time-group">
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
        </div>
        <p>Sekunt</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
