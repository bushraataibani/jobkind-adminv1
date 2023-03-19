import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Skill from "./Skill";
import SkillAdd from "./components/SkillAdd/SkillAdd";
import SkillDelete from "./components/SkillDelete/SkillDelete";
import SkillView from "./components/SkillView/SkillView";
import { SkillSlice } from "../../../_redux/Skills/SkillSlice";

export const SkillContext = createContext(null);

export default function SkillRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = SkillSlice;

  const UIEvents = {
    addSkill: () => {
      history.push(`/master/skill/add`);
    },
    openViewSkillDialog: (id) => {
      history.push(`/master/skill/${id}/view`);
    },
    deleteSkill: (id) => {
      history.push(`/master/skill/${id}/delete`);
    },
  };

  return (
    <SkillContext.Provider value={UIEvents}>
      <Skill />

      <Route path="/master/skill/add">
        {({ history, match }) => (
          <SkillAdd
            show={match != null}
            onHide={() => {
              history.push("/master/skill");
            }}
          />
        )}
      </Route>

      <Route path="/master/skill/:id/view">
        {({ history, match }) => (
          <SkillView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/skill");
              dispatch(actions.removeSelectedSkill());
            }}
          />
        )}
      </Route>

      <Route path="/master/skill/:id/delete">
        {({ history, match }) => (
          <SkillDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/skill");
              dispatch(actions.removeSelectedSkill());
            }}
          />
        )}
      </Route>
    </SkillContext.Provider>
  );
}
