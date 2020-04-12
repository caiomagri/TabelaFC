import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { Container, Logo, Title } from './styles';

export default function Team({ id }) {
  const [team, setTeam] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadTeam() {
      try {
        const url = `lookupteam.php?id=${id}`;
        const response = await api.get(url);

        if (response.status === 200) {
          const { teams } = response.data;
          if (teams.length > 0) {
            if (!mounted) return;
            setTeam(response.data.teams[0]);
          }
        }
      } catch (error) {
        if (Axios.isCancel(error)) {
          // cancelled
        } else {
          throw error;
        }
      }
    }
    loadTeam();
    return () => {
      // Runs when component will unmount
      mounted = false;
    };
  }, [id]);
  return (
    <Container>
      {team !== null ? (
        <>
          <Logo source={{ uri: team.strTeamBadge }} />
          <Title>{team.strTeam}</Title>
        </>
      ) : null}
    </Container>
  );
}

Team.propTypes = {
  id: PropTypes.string.isRequired,
};
