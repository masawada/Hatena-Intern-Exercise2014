package Visualizer;
use strict;
use warnings;

sub new {
  my ($class, $logs) = @_;
  return bless { logs => $logs }, $class;
}
