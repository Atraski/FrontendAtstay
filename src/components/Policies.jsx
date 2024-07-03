import { Fragment } from "react";

const Policies = ({ content }) => {
  const term = content.map((term, index) => {
    return (
      <div className="policy" key={index}>
        <h2 className="sub-heading">{term.heading}</h2>
        {term.policyContent.map((content, index) => {
          return (
            <Fragment key={index}>
              <p>{content}</p>
              {content.includes(":") &&
                term.listItems?.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <p style={{ margin: "1rem 0" }}>{item.listPara}</p>
                      <ul className="policy-list">
                        {item.content.map((list, index) => {
                          return <li key={index}>{list}</li>;
                        })}
                      </ul>
                    </Fragment>
                  );
                })}

              {term.policyContent.length > 1 &&
                index < term.policyContent.length - 1 && <br />}
            </Fragment>
          );
        })}
      </div>
    );
  });

  return <Fragment>{term}</Fragment>;
};

export default Policies;
